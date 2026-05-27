// js/components/Timeline.js

import { timelineMilestones } from '../data.js';

export const Timeline = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-timeline');
    this.render();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Base Intro details
    const introCard = document.createElement('div');
    introCard.className = 'glass-panel';
    introCard.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.3rem; margin-bottom: 8px; color: var(--text-white);">
        <i class="ri-history-line"></i> 2026 Election Milestone Tracker
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">
        Stay on top of critical dates. The glowing progress indicator tracks the current timeframe, helping you understand where we are in the active election cycle. Hover over any date event card to view action details.
      </p>
    `;
    this.container.appendChild(introCard);

    // Timeline wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'timeline-wrapper';

    // Timeline tracks
    const bgLine = document.createElement('div');
    bgLine.className = 'timeline-line';
    wrapper.appendChild(bgLine);

    const progressLine = document.createElement('div');
    progressLine.className = 'timeline-progress';
    progressLine.id = 'timeline-progress-gauge';
    wrapper.appendChild(progressLine);

    // Render event nodes
    let activeIndex = 0;
    timelineMilestones.forEach((event, idx) => {
      if (event.status === 'completed') activeIndex = idx + 1;
      if (event.status === 'active') activeIndex = idx + 0.5; // halfway glow
      
      const eventRow = document.createElement('div');
      eventRow.className = `timeline-event ${event.status || 'pending'}`;
      
      const dot = document.createElement('div');
      dot.className = 'timeline-dot';
      dot.innerHTML = event.status === 'completed' ? `<i class="ri-check-line" style="color: var(--text-dark); font-size: 0.8rem; font-weight: bold;"></i>` : '';
      eventRow.appendChild(dot);

      const content = document.createElement('div');
      content.className = 'timeline-content-card';
      content.innerHTML = `
        <span class="timeline-date">${this.getTranslatedDate(event.date)}</span>
        <h3>${this.getTranslatedName(event.name)}</h3>
        <p>${this.getTranslatedDetails(event.details)}</p>
      `;

      // Read details on hover for voice guide
      content.addEventListener('mouseenter', () => {
        const text = `${event.name}. scheduled on ${event.date}. ${event.details}`;
        this.app.speakText(text);
      });

      eventRow.appendChild(content);
      wrapper.appendChild(eventRow);
    });

    this.container.appendChild(wrapper);

    // Animate progress line after insert
    setTimeout(() => {
      const percentage = (activeIndex / timelineMilestones.length) * 100;
      const progressEl = document.getElementById('timeline-progress-gauge');
      if (progressEl) {
        progressEl.style.height = `${percentage}%`;
      }
    }, 100);
  },

  getTranslatedName(name) {
    if (this.app.state.language === 'es') {
      if (name === "Registration Period Opens") return "Apertura del Período de Registro";
      if (name === "Mail-in / Absentee Ballot Requests Open") return "Apertura de Solicitudes de Voto por Correo";
      if (name === "Registration Deadline (Online/Mail)") return "Fecha Límite de Registro (Línea/Correo)";
      if (name === "Early Voting Starts") return "Inicio del Voto Anticipado";
      if (name === "General Election Day") return "Día de la Elección General";
      if (name === "Certification of Results") return "Certificación de Resultados";
    } else if (this.app.state.language === 'fr') {
      if (name === "Registration Period Opens") return "Ouverture des Inscriptions";
      if (name === "Mail-in / Absentee Ballot Requests Open") return "Demandes de Vote par Correspondance";
      if (name === "Registration Deadline (Online/Mail)") return "Date Limite d'Inscription (Ligne/Poste)";
      if (name === "Early Voting Starts") return "Début du Vote Anticipé";
      if (name === "General Election Day") return "Jour du Scrutin Général";
      if (name === "Certification of Results") return "Certification des Résultats";
    }
    return name;
  },

  getTranslatedDate(date) {
    if (this.app.state.language === 'es') {
      return date.replace('August', 'Agosto')
                 .replace('September', 'Septiembre')
                 .replace('October', 'Octubre')
                 .replace('November', 'Noviembre');
    } else if (this.app.state.language === 'fr') {
      return date.replace('August', 'Août')
                 .replace('September', 'Septembre')
                 .replace('October', 'Octobre')
                 .replace('November', 'Novembre');
    }
    return date;
  },

  getTranslatedDetails(details) {
    if (this.app.state.language === 'es') {
      if (details.includes("Voter registration databases")) return "Las bases de datos de registro de votantes se abren para actualizaciones, cambios y nuevos registros.";
      if (details.includes("Voters can request mail-in ballots")) return "Los votantes pueden solicitar boletas por correo electrónico o mediante formularios físicos.";
      if (details.includes("Last day to submit registration")) return "Último día para enviar formularios de registro en línea o por correo postal.";
      if (details.includes("Designated early voting centers")) return "Centros de votación anticipada abren en todos los recintos con horarios flexibles.";
      if (details.includes("In-person polling stations are open")) return "Las casillas abren de 7:00 AM a 8:00 PM. Todos los votos por correo deben ser entregados.";
      if (details.includes("Local and state election boards")) return "Las juntas electorales completan auditorías, recuentos y certifican oficialmente las elecciones.";
    } else if (this.app.state.language === 'fr') {
      if (details.includes("Voter registration databases")) return "Les bases de données électorales s'ouvrent pour les mises à jour et les nouvelles inscriptions.";
      if (details.includes("Voters can request mail-in ballots")) return "Les électeurs peuvent demander un bulletin de vote par correspondance en ligne.";
      if (details.includes("Last day to submit registration")) return "Dernier jour pour soumettre les formulaires d'inscription en ligne ou par courrier électoral.";
      if (details.includes("Designated early voting centers")) return "Les bureaux de vote anticipé ouvrent pour un vote en personne flexible.";
      if (details.includes("In-person polling stations are open")) return "Bureaux de vote ouverts de 7h00 à 20h00. Les enveloppes par correspondance doivent être postées.";
      if (details.includes("Local and state election boards")) return "Les commissions électorales terminent les audits et certifient officiellement les voix.";
    }
    return details;
  }
};
