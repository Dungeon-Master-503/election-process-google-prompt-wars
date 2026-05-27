// js/app.js

import { journeySteps, quizQuestions, timelineMilestones } from './data.js';
import { Onboarding } from './components/Onboarding.js';
import { Journey } from './components/Journey.js';
import { Chat } from './components/Chat.js';
import { Timeline } from './components/Timeline.js';
import { LearningHub } from './components/LearningHub.js';
import { Widgets } from './components/Widgets.js';
import { Security } from './components/Security.js';

// --- Translation Dictionary ---
const translations = {
  en: {
    journey: "Voter Journey",
    journeySub: "Your step-by-step roadmap to democratic participation",
    chat: "AI Chat Assistant",
    chatSub: "Get neutral, simple answers from your non-partisan guide",
    timeline: "Live Timeline",
    timelineSub: "Crucial deadlines, campaigns, and counting checkpoints",
    learning: "Learning Hub",
    learningSub: "Quizzes, myths vs facts, terms, and checklist challenges",
    widgets: "Live Dashboards",
    widgetsSub: "Countdown, polling booth map, status check, results",
    security: "Trust & Security",
    securitySub: "How votes are secured, audited, and verified",
    toastVoiceOn: "Voice synthesis active. Hover over elements to hear them.",
    toastVoiceOff: "Voice synthesis deactivated.",
    citizen: "Citizen",
    badgeEarned: "Badge Unlocked: "
  },
  es: {
    journey: "Viaje Electoral",
    journeySub: "Tu hoja de ruta paso a paso para la participación democrática",
    chat: "Asistente AI",
    chatSub: "Obtén respuestas neutrales y sencillas de tu guía",
    timeline: "Calendario en Vivo",
    timelineSub: "Fechas límite de registro, campañas y días clave",
    learning: "Centro de Aprendizaje",
    learningSub: "Cuestionarios, mitos y verdades, glosario y tareas",
    widgets: "Panel de Datos",
    widgetsSub: "Cuenta regresiva, mapa de casillas, resultados en vivo",
    security: "Seguridad y Confianza",
    securitySub: "Cómo se protegen, auditan y verifican los votos",
    toastVoiceOn: "Síntesis de voz activa. Pasa el cursor para escuchar.",
    toastVoiceOff: "Síntesis de voz desactivada.",
    citizen: "Ciudadano",
    badgeEarned: "Insignia desbloqueada: "
  },
  fr: {
    journey: "Parcours Électoral",
    journeySub: "Votre feuille de route étape par étape pour voter",
    chat: "Assistant IA",
    chatSub: "Des réponses neutres et simples de votre guide civique",
    timeline: "Calendrier Électoral",
    timelineSub: "Dates limites d'inscription, campagnes et comptage",
    learning: "Centre d'Apprentissage",
    learningSub: "Quiz, mythes vs réalités, lexique et défis",
    widgets: "Tableaux de Bord",
    widgetsSub: "Compte à rebours, carte des bureaux, résultats en direct",
    security: "Confiance & Sécurité",
    securitySub: "Sécurisation, audit et vérification des bulletins",
    toastVoiceOn: "Synthèse vocale activée. Survolez pour écouter.",
    toastVoiceOff: "Synthèse vocale désactivée.",
    citizen: "Citoyen",
    badgeEarned: "Badge Débloqué: "
  }
};

// --- Application Core Class ---
class ElectionNavigatorApp {
  constructor() {
    this.state = this.loadState();
    this.speechUtterance = null;
    this.initDOM();
    this.bindEvents();
    this.bootstrapComponents();
  }

  // --- State Persistence ---
  loadState() {
    const defaultState = {
      user: {
        name: "",
        role: "First-Time Voter", // "First-Time Voter", "Student", "General Citizen"
        completedTasks: [],
        earnedBadges: [],
        quizScore: 0,
        currentStep: 1
      },
      language: "en",
      textSize: "medium",
      dyslexiaFont: false,
      voiceGuidance: false,
      contrastMode: "dark",
      activeView: "journey",
      onboardingComplete: false
    };

    const saved = localStorage.getItem('election_navigator_state');
    if (saved) {
      try {
        return { ...defaultState, ...JSON.parse(saved) };
      } catch (e) {
        console.error("Error parsing saved state, using defaults", e);
        return defaultState;
      }
    }
    return defaultState;
  }

  saveState() {
    localStorage.setItem('election_navigator_state', JSON.stringify(this.state));
    this.updateUserProfileUI();
  }

  resetState() {
    localStorage.removeItem('election_navigator_state');
    this.state = this.loadState();
    this.updateAccessibilityDOM();
    this.showOnboarding();
    this.saveState();
    // Refresh page to clean modular component listeners if needed
    window.location.reload();
  }

  // --- Dynamic DOM Node Setup ---
  initDOM() {
    this.html = document.documentElement;
    this.sidebar = document.getElementById('app-sidebar');
    this.layout = document.getElementById('app-layout');
    this.onboardingOverlay = document.getElementById('onboarding-overlay');
    this.menuToggleBtn = document.getElementById('menu-toggle-btn');
    this.restartTourBtn = document.getElementById('restart-tour-btn');
    
    // Accessibility triggers
    this.langBtn = document.getElementById('lang-btn');
    this.langMenu = document.getElementById('lang-menu');
    this.dyslexiaBtn = document.getElementById('dyslexia-btn');
    this.textSizeBtn = document.getElementById('text-size-btn');
    this.fontSizeMenu = document.getElementById('font-size-menu');
    this.voiceBtn = document.getElementById('voice-btn');
    this.contrastBtn = document.getElementById('contrast-btn');
    this.voiceToast = document.getElementById('voice-toast');
    this.voiceToastText = document.getElementById('voice-toast-text');

    // Page descriptions
    this.pageTitle = document.getElementById('current-page-title');
    this.pageSubtitle = document.getElementById('current-page-subtitle');

    // Sync HTML indicators with state
    this.updateAccessibilityDOM();

    // Check onboarding completion
    if (this.state.onboardingComplete) {
      this.hideOnboarding();
    } else {
      this.showOnboarding();
    }
  }

  // --- Event Handling & Event Bubbling ---
  bindEvents() {
    // Dropdown toggles
    document.addEventListener('click', (e) => {
      // Toggle language menu
      if (this.langBtn.contains(e.target)) {
        this.langMenu.classList.toggle('show');
      } else {
        this.langMenu.classList.remove('show');
      }

      // Toggle font size menu
      if (this.textSizeBtn.contains(e.target)) {
        this.fontSizeMenu.classList.toggle('show');
      } else {
        this.fontSizeMenu.classList.remove('show');
      }

      // Handle custom dropdown item selections
      if (e.target.classList.contains('dropdown-item')) {
        const parent = e.target.parentElement;
        if (parent.id === 'lang-menu') {
          this.setLanguage(e.target.getAttribute('data-lang'));
        } else if (parent.id === 'font-size-menu') {
          this.setTextSize(e.target.getAttribute('data-size'));
        }
      }
    });

    // Sidebar navigation clicks
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetView = btn.getAttribute('data-target');
        this.switchView(targetView);
        
        // Close sidebar on mobile after clicking
        if (window.innerWidth <= 768) {
          this.sidebar.classList.remove('open');
        }
      });
    });

    // Mobile menu drawer toggle
    this.menuToggleBtn.addEventListener('click', () => {
      this.sidebar.classList.toggle('open');
    });

    // Reset onboarding profile
    this.restartTourBtn.addEventListener('click', () => {
      if (confirm("Would you like to reset your profile and restart the onboarding experience?")) {
        this.resetState();
      }
    });

    // Direct Accessibility buttons
    this.dyslexiaBtn.addEventListener('click', () => {
      this.toggleDyslexia();
    });

    this.voiceBtn.addEventListener('click', () => {
      this.toggleVoiceGuidance();
    });

    this.contrastBtn.addEventListener('click', () => {
      this.toggleContrast();
    });

    // TTS hover listener for vocal assistance
    document.body.addEventListener('mouseover', (e) => {
      if (!this.state.voiceGuidance) return;
      
      // Target elements with direct user-facing texts
      const speakTarget = e.target.closest('p, h1, h2, h3, h4, span, label, button');
      if (speakTarget && speakTarget.innerText && !speakTarget.closest('.sidebar-nav') && !speakTarget.closest('.accessibility-panel')) {
        // Debounce speech synthesis to avoid stuttering on quick movements
        clearTimeout(this.speakTimeout);
        this.speakTimeout = setTimeout(() => {
          this.speakText(speakTarget.innerText);
        }, 150);
      }
    });
  }

  // --- Router & view controllers ---
  switchView(viewName) {
    this.state.activeView = viewName;
    
    // Toggle active view panel
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const activePanel = document.getElementById(`view-journey`); // default fallback
    const targetedPanel = document.getElementById(`view-${viewName}`);
    if (targetedPanel) {
      targetedPanel.classList.add('active');
    }

    // Toggle active sidebar item
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('data-target') === viewName) {
        btn.classList.add('active');
      }
    });

    // Translate page titles
    this.updateHeaderTitles();
    this.saveState();
    this.speakText(translations[this.state.language][viewName]);
  }

  updateHeaderTitles() {
    const lang = this.state.language;
    const view = this.state.activeView;
    if (translations[lang] && translations[lang][view]) {
      this.pageTitle.innerText = translations[lang][view];
      this.pageSubtitle.innerText = translations[lang][`${view}Sub` || ''];
    }
  }

  // --- Onboarding Flow Triggers ---
  showOnboarding() {
    this.onboardingOverlay.classList.remove('inactive');
    this.onboardingOverlay.classList.add('active');
    this.layout.classList.remove('layout-visible');
    this.layout.classList.add('layout-hidden');
    Onboarding.render(this);
  }

  hideOnboarding() {
    this.onboardingOverlay.classList.remove('active');
    this.onboardingOverlay.classList.add('inactive');
    this.layout.classList.remove('layout-hidden');
    this.layout.classList.add('layout-visible');
    this.updateUserProfileUI();
    this.switchView(this.state.activeView);
  }

  updateUserProfileUI() {
    const usernameEl = document.getElementById('sidebar-username');
    const userroleEl = document.getElementById('sidebar-userrole');
    const avatarEl = document.getElementById('sidebar-avatar-img');

    const name = this.state.user.name.trim() || translations[this.state.language].citizen;
    usernameEl.innerText = name;
    userroleEl.innerText = this.state.user.role;

    // Pick avatar icon based on role
    let avatarIcon = "ri-user-smile-line";
    if (this.state.user.role.includes("Student")) avatarIcon = "ri-book-open-line";
    if (this.state.user.role.includes("General")) avatarIcon = "ri-user-star-line";
    avatarEl.innerHTML = `<i class="${avatarIcon}"></i>`;
  }

  // --- Accessibility Handlers ---
  updateAccessibilityDOM() {
    // 1. Language Button Indicator
    this.langBtn.querySelector('.btn-lbl').innerText = this.state.language.toUpperCase();

    // 2. Dyslexia Mode
    this.html.setAttribute('data-dyslexia', this.state.dyslexiaFont);
    if (this.state.dyslexiaFont) {
      this.dyslexiaBtn.classList.add('active');
    } else {
      this.dyslexiaBtn.classList.remove('active');
    }

    // 3. Text Size
    this.html.setAttribute('data-text-size', this.state.textSize);
    this.fontSizeMenu.querySelectorAll('.dropdown-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-size') === this.state.textSize) {
        item.classList.add('active');
      }
    });

    // 4. Voice Guidance
    if (this.state.voiceGuidance) {
      this.voiceBtn.classList.add('active');
      this.voiceBtn.querySelector('i').className = "ri-volume-up-line";
    } else {
      this.voiceBtn.classList.remove('active');
      this.voiceBtn.querySelector('i').className = "ri-volume-mute-line";
      this.stopSpeaking();
    }

    // 5. Contrast Mode
    this.html.setAttribute('data-theme', this.state.contrastMode);
    if (this.state.contrastMode === 'high-contrast') {
      this.contrastBtn.classList.add('active');
    } else {
      this.contrastBtn.classList.remove('active');
    }

    this.updateHeaderTitles();
  }

  setLanguage(lang) {
    this.state.language = lang;
    this.updateAccessibilityDOM();
    this.saveState();
    this.bootstrapComponents(); // Re-render components with the new language locale!
  }

  setTextSize(size) {
    this.state.textSize = size;
    this.updateAccessibilityDOM();
    this.saveState();
  }

  toggleDyslexia() {
    this.state.dyslexiaFont = !this.state.dyslexiaFont;
    this.updateAccessibilityDOM();
    this.saveState();
  }

  toggleContrast() {
    this.state.contrastMode = this.state.contrastMode === 'dark' ? 'high-contrast' : 'dark';
    this.updateAccessibilityDOM();
    this.saveState();
  }

  toggleVoiceGuidance() {
    this.state.voiceGuidance = !this.state.voiceGuidance;
    this.updateAccessibilityDOM();
    this.saveState();
    
    // Notify user with voice synthesis status toast
    const msg = this.state.voiceGuidance 
      ? translations[this.state.language].toastVoiceOn
      : translations[this.state.language].toastVoiceOff;
    
    this.showVoiceToast(msg);
    if (this.state.voiceGuidance) {
      this.speakText(msg);
    }
  }

  showVoiceToast(message) {
    this.voiceToastText.innerText = message;
    this.voiceToast.className = "voice-toast-visible";
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.voiceToast.className = "voice-toast-hidden";
    }, 4000);
  }

  // --- Speech Synthesis Narrator ---
  speakText(text) {
    if (!this.state.voiceGuidance || !('speechSynthesis' in window)) return;
    
    this.stopSpeaking();
    
    // Clean markdown bold symbols or icons
    const cleanText = text.replace(/\*\*/g, '').replace(/<[^>]*>/g, '').trim();
    this.speechUtterance = new SpeechSynthesisUtterance(cleanText);
    
    // Set appropriate language locale
    if (this.state.language === 'es') this.speechUtterance.lang = 'es-ES';
    else if (this.state.language === 'fr') this.speechUtterance.lang = 'fr-FR';
    else this.speechUtterance.lang = 'en-US';

    window.speechSynthesis.speak(this.speechUtterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // --- Badge Awarding Alert ---
  unlockBadge(badgeId, badgeName) {
    if (this.state.user.earnedBadges.includes(badgeId)) return;
    this.state.user.earnedBadges.push(badgeId);
    this.saveState();
    
    const notificationText = `${translations[this.state.language].badgeEarned}${badgeName}`;
    this.showVoiceToast(notificationText);
    this.speakText(notificationText);
    
    // Re-render Learning Hub if active to highlight badge
    if (this.state.activeView === 'learning') {
      LearningHub.render(this);
    }
  }

  // --- Component Bootstrapping ---
  bootstrapComponents() {
    if (!this.state.onboardingComplete) return;
    
    Journey.init(this);
    Chat.init(this);
    Timeline.init(this);
    LearningHub.init(this);
    Widgets.init(this);
    Security.init(this);
  }
}

// Instantiate the application globally on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.ElectionNavigator = new ElectionNavigatorApp();
});
