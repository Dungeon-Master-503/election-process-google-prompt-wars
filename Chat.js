// js/components/Chat.js

import { aiDialogueTree } from '../data.js';

export const Chat = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-chat');
    this.chatLog = []; // Stores objects like { sender: 'assistant'|'user', text: string, text_eli15: string, isEli15: boolean }
    this.render();
    this.sendGreeting();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Chat Layout Shell
    const chatWrapper = document.createElement('div');
    chatWrapper.className = 'chat-wrapper';
    
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container';
    chatWrapper.appendChild(chatContainer);

    // Chat Header
    const header = document.createElement('div');
    header.className = 'chat-header';
    header.innerHTML = `
      <div class="assistant-info">
        <div class="assistant-avatar">
          <i class="ri-robot-2-line"></i>
        </div>
        <div class="assistant-details">
          <h3>Navigator AI</h3>
          <span class="assistant-status">Online & unbiased</span>
        </div>
      </div>
      <button class="reset-onboarding-btn" id="clear-chat-btn" title="Clear Chat History">
        <i class="ri-delete-bin-line"></i>
      </button>
    `;
    chatContainer.appendChild(header);

    // History Log area
    const history = document.createElement('div');
    history.className = 'chat-history';
    history.id = 'chat-history-log';
    chatContainer.appendChild(history);

    // Suggestions chips area
    const suggestions = document.createElement('div');
    suggestions.className = 'chat-suggestions';
    suggestions.id = 'chat-suggestions-area';
    chatContainer.appendChild(suggestions);

    // Input Bar
    const inputArea = document.createElement('div');
    inputArea.className = 'chat-input-area';
    inputArea.innerHTML = `
      <div class="chat-input-container">
        <input type="text" id="chat-user-input" placeholder="Type a question (e.g. 'How do I register?')..." />
      </div>
      <button class="send-btn" id="chat-send-btn" aria-label="Send message">
        <i class="ri-send-plane-fill"></i>
      </button>
    `;
    chatContainer.appendChild(inputArea);

    this.container.appendChild(chatWrapper);

    // Bindings
    this.historyLogEl = history;
    this.userInputEl = document.getElementById('chat-user-input');
    this.sendBtnEl = document.getElementById('chat-send-btn');
    
    this.sendBtnEl.addEventListener('click', () => this.handleUserInput());
    this.userInputEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserInput();
    });

    document.getElementById('clear-chat-btn').addEventListener('click', () => {
      this.chatLog = [];
      this.historyLogEl.innerHTML = "";
      this.sendGreeting();
    });

    this.renderSuggestions();
  },

  sendGreeting() {
    const lang = this.app.state.language;
    const greetings = aiDialogueTree[lang]?.greetings || aiDialogueTree['en'].greetings;
    // Pick random greeting
    const greetText = greetings[Math.floor(Math.random() * greetings.length)];
    this.addMessage('assistant', greetText, "I am your companion. I can help you register, check deadlines, find polling locations, understand ballot rules, and keep elections secure. Ask me a question!");
  },

  renderSuggestions() {
    const area = document.getElementById('chat-suggestions-area');
    area.innerHTML = "";

    const lang = this.app.state.language;
    let chips = [
      "How do I register?",
      "What documents do I need?",
      "Where is my polling booth?",
      "Are elections secure?"
    ];

    if (lang === 'es') {
      chips = [
        "¿Cómo me registro?",
        "¿Qué documentos necesito?",
        "¿Dónde voto?",
        "¿Es seguro el conteo?"
      ];
    } else if (lang === 'fr') {
      chips = [
        "Comment s'inscrire?",
        "Quels documents requis?",
        "Où est mon bureau?",
        "Le vote est-il sûr?"
      ];
    }

    chips.forEach(text => {
      const chip = document.createElement('button');
      chip.className = 'prompt-chip';
      chip.innerText = text;
      chip.addEventListener('click', () => {
        this.userInputEl.value = text;
        this.handleUserInput();
      });
      area.appendChild(chip);
    });
  },

  handleUserInput() {
    const query = this.userInputEl.value.trim();
    if (!query) return;

    this.userInputEl.value = "";
    // Append user message
    this.addMessage('user', query);

    // Render typing indicator
    this.showTypingIndicator();

    // Process reply
    setTimeout(() => {
      this.hideTypingIndicator();
      this.processResponse(query);
    }, 1000);
  },

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-message assistant typing-indicator-msg';
    indicator.innerHTML = `
      <div class="assistant-avatar"><i class="ri-robot-2-line"></i></div>
      <div class="message-bubble">
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      </div>
    `;
    this.historyLogEl.appendChild(indicator);
    this.scrollToBottom();
  },

  hideTypingIndicator() {
    const el = this.historyLogEl.querySelector('.typing-indicator-msg');
    if (el) el.remove();
  },

  processResponse(query) {
    const lang = this.app.state.language;
    const data = aiDialogueTree[lang] || aiDialogueTree['en'];
    const queryLower = query.toLowerCase();

    let foundResponse = null;
    let foundEli15 = null;

    // Search keywords
    for (const item of data.keywords) {
      if (item.keys.some(key => queryLower.includes(key))) {
        foundResponse = item.response;
        foundEli15 = item.eli15;
        break;
      }
    }

    // Fallback response
    if (!foundResponse) {
      foundResponse = data.fallback;
      foundEli15 = lang === 'es' 
        ? "Quiero ayudarte de forma sencilla. Pregúntame sobre cómo registrarte, qué llevar el día del voto o cómo se protegen las casillas."
        : lang === 'fr'
        ? "Je veux vous expliquer simplement. Posez-moi des questions sur l'inscription, vos pièces d'identité ou la sécurité du vote."
        : "I want to explain things simply. Try asking about how to register, what identification you need, or how polling booths stay safe.";
    }

    // Add chatbot message
    this.addMessage('assistant', foundResponse, foundEli15);

    // Check if voter completed 3 chat interactions to unlock a badge
    const chatInteractions = this.chatLog.filter(m => m.sender === 'user').length;
    if (chatInteractions === 3) {
      this.app.unlockBadge("inquisitive", "Civic Researcher");
    }
  },

  addMessage(sender, text, text_eli15 = "") {
    const msgObj = {
      sender,
      text,
      text_eli15: text_eli15 || text,
      isEli15: false
    };

    this.chatLog.push(msgObj);
    const index = this.chatLog.length - 1;

    const msgNode = document.createElement('div');
    msgNode.className = `chat-message ${sender}`;
    msgNode.id = `chat-msg-${index}`;
    
    this.renderMessageBubble(msgNode, msgObj, index);
    this.historyLogEl.appendChild(msgNode);
    this.scrollToBottom();

    // Trigger global TTS voice if voiceGuidance is on (only for bot responses)
    if (sender === 'assistant' && this.app.state.voiceGuidance) {
      this.app.speakText(text);
    }
  },

  renderMessageBubble(container, msgObj, index) {
    container.innerHTML = ""; // Clear existing

    // Avatar
    if (msgObj.sender === 'assistant') {
      container.innerHTML += `<div class="assistant-avatar"><i class="ri-robot-2-line"></i></div>`;
    } else {
      container.innerHTML += `<div class="user-avatar"><i class="ri-user-smile-line"></i></div>`;
    }

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    // Convert newlines to breaks or process basic bold markdown
    const formattedText = (msgObj.isEli15 ? msgObj.text_eli15 : msgObj.text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
    bubble.innerHTML = `<p>${formattedText}</p>`;

    // Add actions (ELI15, Read Aloud buttons) inside Assistant response bubbles
    if (msgObj.sender === 'assistant') {
      const actions = document.createElement('div');
      actions.className = 'message-actions';
      actions.innerHTML = `
        <button class="msg-action-btn ${msgObj.isEli15 ? 'active' : ''}" data-action="eli15">
          <i class="ri-lightbulb-line"></i> ${msgObj.isEli15 ? 'Standard' : 'ELI15'}
        </button>
        <button class="msg-action-btn" data-action="speak">
          <i class="ri-volume-up-line"></i> Speak
        </button>
      `;

      // ELI15 click toggle
      actions.querySelector('[data-action="eli15"]').addEventListener('click', () => {
        msgObj.isEli15 = !msgObj.isEli15;
        this.renderMessageBubble(container, msgObj, index);
      });

      // Sound read aloud click trigger
      actions.querySelector('[data-action="speak"]').addEventListener('click', () => {
        const speakText = msgObj.isEli15 ? msgObj.text_eli15 : msgObj.text;
        this.app.speakText(speakText);
      });

      bubble.appendChild(actions);
    }

    container.appendChild(bubble);
  },

  scrollToBottom() {
    this.historyLogEl.scrollTop = this.historyLogEl.scrollHeight;
  }
};
