// js/components/LearningHub.js

import { quizQuestions, mythsVsFacts, civicGlossary } from '../data.js';

export const LearningHub = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-learning');
    this.activeTab = "quiz"; // "quiz", "myths", "checklist", "dictionary"
    
    // Quiz state
    this.currentQuestionIdx = 0;
    this.selectedOptionIdx = null;
    this.quizAnswers = {}; // id -> selected option
    this.correctCount = 0;

    // Dictionary search
    this.searchTerm = "";

    this.render();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Two-Column Grid Layout
    const layout = document.createElement('div');
    layout.className = 'learning-layout';
    this.container.appendChild(layout);

    // Left Column: Main Tab content area
    const leftCol = document.createElement('div');
    leftCol.className = 'hub-main-content';
    layout.appendChild(leftCol);

    // Tab Navigation Header
    const tabNav = document.createElement('div');
    tabNav.className = 'learning-tab-nav';
    tabNav.innerHTML = `
      <button class="tab-btn ${this.activeTab === 'quiz' ? 'active' : ''}" data-tab="quiz">
        <i class="ri-questionnaire-line"></i> Civic Quiz
      </button>
      <button class="tab-btn ${this.activeTab === 'myths' ? 'active' : ''}" data-tab="myths">
        <i class="ri-survey-line"></i> Myth vs Fact
      </button>
      <button class="tab-btn ${this.activeTab === 'checklist' ? 'active' : ''}" data-tab="checklist">
        <i class="ri-checkbox-line"></i> Voting Checklist
      </button>
      <button class="tab-btn ${this.activeTab === 'dictionary' ? 'active' : ''}" data-tab="dictionary">
        <i class="ri-book-open-line"></i> Civic Glossary
      </button>
    `;
    leftCol.appendChild(tabNav);

    // Bind tab clicks
    tabNav.querySelectorAll('[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTab = btn.getAttribute('data-tab');
        this.render();
        this.app.speakText(this.activeTab + " tab selected");
      });
    });

    // Content container based on activeTab
    const tabContent = document.createElement('div');
    tabContent.id = 'learning-tab-content';
    leftCol.appendChild(tabContent);

    if (this.activeTab === 'quiz') {
      this.renderQuiz(tabContent);
    } else if (this.activeTab === 'myths') {
      this.renderMyths(tabContent);
    } else if (this.activeTab === 'checklist') {
      this.renderChecklist(tabContent);
    } else if (this.activeTab === 'dictionary') {
      this.renderDictionary(tabContent);
    }

    // Right Column: Progress & Badges Sidebar
    const rightCol = document.createElement('div');
    rightCol.className = 'hub-sidebar';
    layout.appendChild(rightCol);

    this.renderBadgeSidebar(rightCol);
  },

  // --- 1. Civic Quiz Section ---
  renderQuiz(container) {
    const totalQ = quizQuestions.length;
    
    // Check if quiz has been finished
    if (this.currentQuestionIdx >= totalQ) {
      container.innerHTML = `
        <div class="glass-panel text-center" style="text-align: center;">
          <h3 style="font-family: var(--font-header); font-size: 1.4rem; color: var(--accent-gold); margin-bottom: 12px;">
            <i class="ri-trophy-line"></i> Quiz Completed!
          </h3>
          <p style="font-size: 1.1rem; color: var(--text-white); margin-bottom: 20px;">
            You scored <strong>${this.correctCount} out of ${totalQ}</strong> correct answers.
          </p>
          <button class="primary-btn" id="restart-quiz-btn">
            <i class="ri-restart-line"></i> Try Quiz Again
          </button>
        </div>
      `;

      // Check for quiz badge awards
      if (this.correctCount === totalQ) {
        this.app.unlockBadge("quiz_master", "Trivia Champion");
      }

      container.querySelector('#restart-quiz-btn').addEventListener('click', () => {
        this.currentQuestionIdx = 0;
        this.selectedOptionIdx = null;
        this.quizAnswers = {};
        this.correctCount = 0;
        this.render();
      });

      return;
    }

    const q = quizQuestions[this.currentQuestionIdx];
    const answered = this.quizAnswers[q.id] !== undefined;

    const quizCard = document.createElement('div');
    quizCard.className = 'quiz-card';
    quizCard.innerHTML = `
      <div class="quiz-question-header">
        <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold;">Question ${this.currentQuestionIdx + 1} of ${totalQ}</span>
        <span class="quiz-badge-tracker"><i class="ri-star-fill"></i> Score: ${this.correctCount}</span>
      </div>

      <div class="quiz-question-text">${q.question}</div>

      <div class="quiz-options-list">
        ${q.options.map((opt, idx) => {
          let optionClass = "";
          let icon = "";
          
          if (answered) {
            const selected = this.quizAnswers[q.id];
            if (idx === q.correctAnswer) {
              optionClass = "correct";
              icon = `<i class="ri-checkbox-circle-fill"></i>`;
            } else if (idx === selected) {
              optionClass = "incorrect";
              icon = `<i class="ri-close-circle-fill"></i>`;
            }
          }
          
          return `
            <button class="quiz-option-btn ${optionClass}" data-idx="${idx}" ${answered ? 'disabled' : ''}>
              <span>${opt}</span>
              ${icon}
            </button>
          `;
        }).join('')}
      </div>

      ${answered ? `
        <div class="quiz-explanation">
          <strong>Explanation:</strong> ${q.explanation}
        </div>
        <div style="text-align: right; margin-top: 20px;">
          <button class="primary-btn" id="quiz-next-btn" style="padding: 10px 20px; font-size: 0.85rem;">
            Next Question <i class="ri-arrow-right-line"></i>
          </button>
        </div>
      ` : ''}
    `;

    // Speak question text
    if (!answered) {
      this.app.speakText(q.question);
    }

    // Option selections bindings
    quizCard.querySelectorAll('.quiz-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const optionIdx = parseInt(btn.getAttribute('data-idx'));
        this.quizAnswers[q.id] = optionIdx;
        
        if (optionIdx === q.correctAnswer) {
          this.correctCount++;
          this.app.speakText("Correct. " + q.explanation);
        } else {
          this.app.speakText("Incorrect. The correct answer was " + q.options[q.correctAnswer] + ". " + q.explanation);
        }

        this.render();
      });
    });

    if (answered) {
      quizCard.querySelector('#quiz-next-btn').addEventListener('click', () => {
        this.currentQuestionIdx++;
        this.render();
      });
    }

    container.appendChild(quizCard);
  },

  // --- 2. Myths vs Facts Flipping Cards ---
  renderMyths(container) {
    const list = document.createElement('div');
    list.className = 'myths-grid';
    
    mythsVsFacts.forEach(item => {
      const card = document.createElement('div');
      card.className = 'myth-card';
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `Myth: ${item.myth}. Click to reveal verification fact.`);
      card.innerHTML = `
        <div class="myth-card-inner">
          <div class="myth-front">
            <h3><i class="ri-close-circle-line"></i> Myth</h3>
            <p>"${item.myth}"</p>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 10px;"><i class="ri-hand-click-line"></i> Click to flip</span>
          </div>
          <div class="myth-back">
            <h3><i class="ri-checkbox-circle-line"></i> Fact Check</h3>
            <p>${item.fact}</p>
            <span style="font-size: 0.7rem; color: var(--text-muted); margin-top: 10px;"><i class="ri-hand-click-line"></i> Click to flip</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        card.classList.toggle('flipped');
        
        // Voice text based on flip status
        if (card.classList.contains('flipped')) {
          this.app.speakText("Fact. " + item.fact);
        } else {
          this.app.speakText("Myth. " + item.myth);
        }
      });

      list.appendChild(card);
    });

    container.appendChild(list);
  },

  // --- 3. Voting Preparedness Checklist ---
  renderChecklist(container) {
    const tasks = [
      "Registered to vote in current county",
      "Confirmed identification documents are valid and unexpired",
      "Looked up precinct voting hours and polling booth address",
      "Downloaded sample ballot and researched local candidate choices"
    ];

    const savedTasks = this.app.state.user.completedTasks || [];
    
    const panel = document.createElement('div');
    panel.className = 'glass-panel';
    panel.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.15rem; margin-bottom: 12px; color: var(--text-white);">
        <i class="ri-check-double-line"></i> Ready to Vote? Personal Checklist
      </h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;">
        Check off these critical preparation steps. Completing all items confirms you are 100% ready to step into the voting booth on Election Day!
      </p>

      <div class="checklist-group" style="margin-top: 0;">
        ${tasks.map((task, idx) => {
          const checked = savedTasks.includes(task);
          return `
            <div class="checklist-item ${checked ? 'checked' : ''}" style="padding: 12px 16px; margin-bottom: 12px;">
              <input type="checkbox" id="prep-${idx}" data-task="${task}" ${checked ? 'checked' : ''} style="width: 20px; height: 20px;">
              <label for="prep-${idx}" style="font-size: 0.95rem; font-weight: 500; margin-left: 6px;">${task}</label>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Connect checkbox toggle events
    panel.querySelectorAll('input[type="checkbox"]').forEach(box => {
      box.addEventListener('change', (e) => {
        const taskName = e.target.getAttribute('data-task');
        let currentTasks = this.app.state.user.completedTasks || [];

        if (e.target.checked) {
          if (!currentTasks.includes(taskName)) currentTasks.push(taskName);
          this.app.speakText("Checked: " + taskName);
        } else {
          currentTasks = currentTasks.filter(item => item !== taskName);
          this.app.speakText("Unchecked: " + taskName);
        }

        this.app.state.user.completedTasks = currentTasks;
        
        // Award badge if all 4 tasks are complete!
        const hasAll = tasks.every(item => currentTasks.includes(item));
        if (hasAll) {
          this.app.unlockBadge("prepared_badge", "Prepared Citizen");
        }

        this.app.saveState();
        this.render(); // Re-render to refresh gauge and sidebar list
      });
    });

    container.appendChild(panel);
  },

  // --- 4. Civic Terms Dictionary Glossary ---
  renderDictionary(container) {
    const panel = document.createElement('div');
    panel.className = 'glass-panel';
    
    // Search elements
    panel.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.15rem; margin-bottom: 6px; color: var(--text-white);">
        <i class="ri-book-open-line"></i> Civic Glossary Dictionary
      </h3>
      <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
        Look up political terms and ballot nomenclature simply. Search for words below:
      </p>

      <div class="glossary-search">
        <input type="text" id="glossary-search-input" placeholder="Search terms (e.g. Gerrymander, Electoral)..." value="${this.searchTerm}">
      </div>

      <div class="glossary-list" id="glossary-word-container">
        <!-- Rendered in filter helper -->
      </div>
    `;

    container.appendChild(panel);

    const input = panel.querySelector('#glossary-search-input');
    input.addEventListener('input', (e) => {
      this.searchTerm = e.target.value.toLowerCase().trim();
      this.filterGlossaryList();
    });

    // Initial render
    this.filterGlossaryList();
    
    // Auto focus and place cursor at end
    setTimeout(() => {
      input.focus();
    }, 100);
  },

  filterGlossaryList() {
    const listEl = document.getElementById('glossary-word-container');
    if (!listEl) return;

    listEl.innerHTML = "";

    const filtered = civicGlossary.filter(item => {
      return item.term.toLowerCase().includes(this.searchTerm) || 
             item.definition.toLowerCase().includes(this.searchTerm);
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div style="font-size: 0.85rem; color: var(--text-muted); padding: 12px; text-align: center;">No matching definitions found.</div>`;
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('div');
      row.className = 'glossary-item';
      row.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <h4 class="glossary-term">${item.term}</h4>
          <button class="msg-action-btn" data-action="eli15-word" style="padding: 2px 6px; font-size: 0.7rem;">
            ELI15
          </button>
        </div>
        <p class="glossary-def" id="def-text-${item.term.replace(/\s+/g, '-')}">${item.definition}</p>
      `;

      let eli15Toggle = false;
      const defEl = row.querySelector(`#def-text-${item.term.replace(/\s+/g, '-')}`);
      
      row.querySelector('[data-action="eli15-word"]').addEventListener('click', (e) => {
        eli15Toggle = !eli15Toggle;
        if (eli15Toggle) {
          defEl.innerText = item.eli15;
          e.target.innerText = "Standard";
          e.target.classList.add('active');
          this.app.speakText(item.eli15);
        } else {
          defEl.innerText = item.definition;
          e.target.innerText = "ELI15";
          e.target.classList.remove('active');
          this.app.speakText(item.definition);
        }
      });

      listEl.appendChild(row);
    });
  },

  // --- Right column Sidebar: Badges & Gauge ---
  renderBadgeSidebar(container) {
    // 1. Checklist Gauge Widget
    const gaugePanel = document.createElement('div');
    gaugePanel.className = 'glass-panel';
    
    // Checklist gauge math
    const tasks = [
      "Registered to vote in current county",
      "Confirmed identification documents are valid and unexpired",
      "Looked up precinct voting hours and polling booth address",
      "Downloaded sample ballot and researched local candidate choices"
    ];
    const saved = this.app.state.user.completedTasks || [];
    const count = tasks.filter(t => saved.includes(t)).length;
    const pct = Math.round((count / tasks.length) * 100);
    const strokeOffset = 301.6 - (301.6 * (count / tasks.length));

    gaugePanel.innerHTML = `
      <div class="checklist-gauge-container">
        <div class="progress-radial">
          <svg width="120" height="120">
            <circle class="radial-track" cx="60" cy="60" r="48"></circle>
            <circle class="radial-fill" cx="60" cy="60" r="48" style="stroke-dashoffset: ${strokeOffset};"></circle>
          </svg>
          <div class="radial-text">${pct}%</div>
        </div>
        <div class="checklist-tasks-summary">
          <strong>${count} of ${tasks.length} Complete</strong><br>
          Voting Preparedness
        </div>
      </div>
    `;
    container.appendChild(gaugePanel);

    // 2. Achievements badges list
    const badgePanel = document.createElement('div');
    badgePanel.className = 'glass-panel';
    
    const badges = [
      { id: "explorer", name: "Explorer", desc: "Completed onboarding profile setup", icon: "ri-map-pin-line" },
      { id: "registered_voter", name: "Registrant", desc: "Finished Step 1 Registration checklist", icon: "ri-checkbox-circle-line" },
      { id: "inquisitive", name: "Researcher", desc: "Sent 3 questions to the Assistant", icon: "ri-search-eye-line" },
      { id: "prepared_badge", name: "Prepared Citizen", desc: "Finished all 4 voting day checklists", icon: "ri-shield-check-line" },
      { id: "quiz_master", name: "Trivia Master", desc: "Scored 100% correct in the Trivia Quiz", icon: "ri-medal-line" },
      { id: "civic_master", name: "Grand Elector", desc: "Completed checklists on all 8 roadmap steps", icon: "ri-vip-crown-line" }
    ];

    const unlockedIds = this.app.state.user.earnedBadges || [];

    badgePanel.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1rem; color: var(--text-white); border-bottom: 1px solid var(--border-glass); padding-bottom: 8px; margin-bottom: 12px;">
        <i class="ri-medal-line" style="color: var(--accent-gold);"></i> Civic Achievement Badges
      </h3>
      <div class="badges-container">
        ${badges.map(b => {
          const unlocked = unlockedIds.includes(b.id);
          return `
            <div class="badge-item ${unlocked ? 'unlocked' : ''}" title="${b.name}: ${b.desc}">
              <div class="badge-icon">
                <i class="${b.icon}"></i>
              </div>
              <span class="badge-name">${b.name}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Speak badge name and details on hover
    badgePanel.querySelectorAll('.badge-item').forEach((item, idx) => {
      item.addEventListener('mouseenter', () => {
        const b = badges[idx];
        const isUnlocked = unlockedIds.includes(b.id);
        const voiceText = isUnlocked 
          ? `Insignia desbloqueada: ${b.name}. ${b.desc}.`
          : `Locked badge. ${b.name}. requirement: ${b.desc}.`;
        this.app.speakText(voiceText);
      });
    });

    container.appendChild(badgePanel);
  }
};
