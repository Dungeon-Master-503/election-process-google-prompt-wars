// js/components/Journey.js

import { journeySteps } from '../data.js';

export const Journey = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-journey');
    this.render();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Grid Container
    const grid = document.createElement('div');
    grid.className = 'journey-nodes-grid';

    // Renders the 8 road nodes
    journeySteps.forEach((step, index) => {
      const isCompleted = this.isStepCompleted(step);
      const isActive = this.app.state.user.currentStep === step.id;

      let cardStatusClass = "";
      if (isCompleted) cardStatusClass = "completed";
      else if (isActive) cardStatusClass = "active";

      const card = document.createElement('div');
      card.className = `journey-node-card ${cardStatusClass}`;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Step ${step.id}: ${step.title}. ${step.shortDesc}`);
      card.innerHTML = `
        <div class="node-number">0${step.id}</div>
        <div class="node-icon-wrapper">
          <i class="${isCompleted ? 'ri-checkbox-circle-fill' : step.icon}"></i>
        </div>
        <h3>${this.getTranslatedTitle(step)}</h3>
        <p>${this.getTranslatedShortDesc(step)}</p>
      `;

      // Event listener for opening details modal
      card.addEventListener('click', () => {
        this.openDetailsModal(step);
      });

      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  },

  // Check if a step has all checklist items completed
  isStepCompleted(step) {
    const userCompleted = this.app.state.user.completedTasks || [];
    return step.checklist.every(item => userCompleted.includes(item));
  },

  getTranslatedTitle(step) {
    // Simple translation fallback for demo
    if (this.app.state.language === 'es') {
      if (step.id === 1) return "Registro de Votantes";
      if (step.id === 2) return "Chequeo de Elegibilidad";
      if (step.id === 3) return "Documentos Requeridos";
      if (step.id === 4) return "Buscar Casillas";
      if (step.id === 5) return "Conocer Candidatos";
      if (step.id === 6) return "El Día del Voto";
      if (step.id === 7) return "Conteo de Votos";
      if (step.id === 8) return "Anuncio de Resultados";
    } else if (this.app.state.language === 'fr') {
      if (step.id === 1) return "Inscription Électorale";
      if (step.id === 2) return "Vérification d'Éligibilité";
      if (step.id === 3) return "Documents Requis";
      if (step.id === 4) return "Bureaux de Vote";
      if (step.id === 5) return "Comprendre les Candidats";
      if (step.id === 6) return "Jour du Scrutin";
      if (step.id === 7) return "Comptage des Voix";
      if (step.id === 8) return "Annonce des Résultats";
    }
    return step.title;
  },

  getTranslatedShortDesc(step) {
    if (this.app.state.language === 'es') {
      if (step.id === 1) return "Inscríbete para votar en tu región.";
      if (step.id === 2) return "Confirma que cumples con los criterios.";
      if (step.id === 3) return "Organiza tus identificaciones necesarias.";
      if (step.id === 4) return "Ubica tu lugar de votación asignado.";
      if (step.id === 5) return "Investiga candidatos y propuestas.";
      if (step.id === 6) return "Emite tu voto en persona o por correo.";
      if (step.id === 7) return "Aprende cómo se validan y cuentan los votos.";
      if (step.id === 8) return "Resultados oficiales y certificaciones.";
    } else if (this.app.state.language === 'fr') {
      if (step.id === 1) return "Inscrivez-vous sur les listes.";
      if (step.id === 2) return "Vérifiez vos critères d'accès.";
      if (step.id === 3) return "Préparez vos documents d'identité.";
      if (step.id === 4) return "Localisez votre bureau de vote.";
      if (step.id === 5) return "Étudiez les candidats et programmes.";
      if (step.id === 6) return "Déposez votre bulletin.";
      if (step.id === 7) return "Comprenez le décompte sécurisé.";
      if (step.id === 8) return "Annonce officielle et certification.";
    }
    return step.shortDesc;
  },

  // Modal details view overlay
  openDetailsModal(step) {
    // Create modal element dynamically
    const modal = document.createElement('div');
    modal.className = 'journey-detail-modal show';
    document.body.appendChild(modal);

    // Initial state of ELI15 mode inside this modal
    let eli15Mode = false;

    const renderModalContent = () => {
      const userCompleted = this.app.state.user.completedTasks || [];
      const title = this.getTranslatedTitle(step);

      modal.innerHTML = `
        <div class="modal-card">
          <div class="modal-header">
            <div class="modal-title-area">
              <div class="modal-icon">
                <i class="${step.icon}"></i>
              </div>
              <div>
                <h2>${title}</h2>
                <p style="font-size: 0.8rem; color: var(--accent-cyan); text-transform: uppercase;">Step ${step.id} of 8</p>
              </div>
            </div>
            <button class="modal-close-btn" id="close-modal-trigger" aria-label="Close details">&times;</button>
          </div>
          
          <div class="modal-body">
            <div class="modal-grid">
              
              <!-- Info description -->
              <div class="modal-info-panel">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <h3>${eli15Mode ? 'Explain Like I\'m 15' : 'Official Summary'}</h3>
                  <button class="msg-action-btn ${eli15Mode ? 'active' : ''}" id="modal-eli15-toggle">
                    <i class="ri-lightbulb-line"></i> ${eli15Mode ? 'Standard Mode' : 'Explain Like I\'m 15'}
                  </button>
                </div>
                
                <p id="modal-desc-body">
                  ${eli15Mode ? step.description_eli15 : step.description}
                </p>

                <!-- Checklists items -->
                <div class="checklist-group">
                  <h4><i class="ri-checkbox-multiple-line"></i> Action Checklist</h4>
                  <div id="modal-checklist-list">
                    ${step.checklist.map((item, idx) => {
                      const checked = userCompleted.includes(item);
                      return `
                        <div class="checklist-item ${checked ? 'checked' : ''}">
                          <input type="checkbox" id="check-${idx}" data-task="${item}" ${checked ? 'checked' : ''}>
                          <label for="check-${idx}">${item}</label>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>

              <!-- Side panel tips, timelines -->
              <div class="modal-side-panel">
                <div class="meta-widget">
                  <h4><i class="ri-time-line"></i> Timeline & Rules</h4>
                  <p>${step.timeline}</p>
                </div>

                ${step.documents.length > 0 ? `
                  <div class="meta-widget">
                    <h4><i class="ri-file-info-line"></i> Bring with you:</h4>
                    <ul style="list-style-type: square; margin-left: 16px; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">
                      ${step.documents.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}

                <div class="meta-widget">
                  <h4><i class="ri-chat-help-line"></i> Quick FAQ</h4>
                  <div class="faq-accordion">
                    ${step.faqs.map((faq, idx) => `
                      <div class="faq-item" id="faq-item-${idx}">
                        <button class="faq-trigger" data-faq="${idx}">
                          ${faq.question} <i class="ri-arrow-down-s-line"></i>
                        </button>
                        <div class="faq-content">
                          ${eli15Mode ? faq.answer_eli15 : faq.answer}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="modal-footer">
            <div style="font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
              <i class="ri-information-line"></i> Completing all tasks marks this node as complete.
            </div>
            <button class="primary-btn" id="modal-done-btn" style="padding: 8px 20px; font-size: 0.85rem;">Done</button>
          </div>
        </div>
      `;

      // Read details aloud if Speech Synthesis is active
      const narrationText = eli15Mode ? step.description_eli15 : step.description;
      this.app.speakText(narrationText);

      // Event bindings
      modal.querySelector('#close-modal-trigger').addEventListener('click', closeModal);
      modal.querySelector('#modal-done-btn').addEventListener('click', closeModal);

      // ELI15 Toggle
      modal.querySelector('#modal-eli15-toggle').addEventListener('click', () => {
        eli15Mode = !eli15Mode;
        renderModalContent();
      });

      // FAQ accordion toggle
      modal.querySelectorAll('.faq-trigger').forEach(trigger => {
        trigger.addEventListener('click', () => {
          const faqIdx = trigger.getAttribute('data-faq');
          const faqItem = modal.querySelector(`#faq-item-${faqIdx}`);
          faqItem.classList.toggle('open');
          
          if (faqItem.classList.contains('open')) {
            const faqText = faqItem.querySelector('.faq-content').innerText;
            this.app.speakText(faqText);
          }
        });
      });

      // Checkbox click bindings
      modal.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          const taskName = e.target.getAttribute('data-task');
          let currentTasks = this.app.state.user.completedTasks || [];
          
          if (e.target.checked) {
            if (!currentTasks.includes(taskName)) currentTasks.push(taskName);
          } else {
            currentTasks = currentTasks.filter(task => task !== taskName);
          }

          this.app.state.user.completedTasks = currentTasks;
          
          // If this step is fully completed, award progress or achievements
          if (this.isStepCompleted(step)) {
            // Update active state step pointer
            if (this.app.state.user.currentStep === step.id && step.id < 8) {
              this.app.state.user.currentStep = step.id + 1;
            }
            
            // Unlock badge for first node completed!
            if (step.id === 1) {
              this.app.unlockBadge("registered_voter", "Certified Registrant");
            }
            // Unlock badge for finishing all 8 roadmap items
            const allCompleted = journeySteps.every(js => {
              return js.checklist.every(item => currentTasks.includes(item));
            });
            if (allCompleted) {
              this.app.unlockBadge("civic_master", "Grand Elector");
            }
          }

          this.app.saveState();
          
          // Re-render modal to display strikethroughs
          renderModalContent();
          
          // Update main background roadmap grid states
          this.render();
        });
      });
    };

    const closeModal = () => {
      this.app.stopSpeaking();
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
      }, 300);
    };

    renderModalContent();
  }
};
