// js/components/Onboarding.js

export const Onboarding = {
  render(app) {
    const overlay = app.onboardingOverlay;
    overlay.innerHTML = ""; // Clear existing onboarding

    let currentStep = 1;
    let selectedRole = "First-Time Voter";
    let userName = "";

    const card = document.createElement("div");
    card.className = "onboarding-card";
    overlay.appendChild(card);

    // Dynamic inner step renderer
    const renderStep = () => {
      card.innerHTML = ""; // Clear current card content

      if (currentStep === 1) {
        // Welcome and Language selection
        card.innerHTML = `
          <div class="onboarding-avatar-container">
            <div class="avatar-ring"></div>
            <div class="avatar-core">
              <i class="ri-compass-3-line"></i>
            </div>
          </div>
          <h2>Election Navigator</h2>
          <p>Your futuristic civic guide. Transform the complex puzzle of voting into an engaging, simple, and transparent journey. Choose your language to begin:</p>
          
          <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 30px;">
            <button class="tab-btn ${app.state.language === 'en' ? 'active' : ''}" data-lang="en">English</button>
            <button class="tab-btn ${app.state.language === 'es' ? 'active' : ''}" data-lang="es">Español</button>
            <button class="tab-btn ${app.state.language === 'fr' ? 'active' : ''}" data-lang="fr">Français</button>
          </div>

          <button class="primary-btn" id="next-btn-1">
            Get Started <i class="ri-arrow-right-line"></i>
          </button>
        `;

        // Speak the greeting
        const welcomeText = "Welcome to Election Navigator, your futuristic civic guide. Let's make voting simple. Click get started to begin.";
        app.speakText(welcomeText);

        // Bind Language selectors in onboarding
        card.querySelectorAll('[data-lang]').forEach(btn => {
          btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            app.setLanguage(lang);
            renderStep(); // Re-render this step to update text/state
          });
        });

        card.querySelector("#next-btn-1").addEventListener("click", () => {
          currentStep = 2;
          renderStep();
        });

      } else if (currentStep === 2) {
        // Choose profile role
        card.innerHTML = `
          <h2>Who are you voting as?</h2>
          <p>We'll customize your journey guides, timelines, and terminology based on your background.</p>
          
          <div class="profile-options">
            <div class="profile-card ${selectedRole === 'First-Time Voter' ? 'selected' : ''}" data-role="First-Time Voter">
              <i class="ri-user-star-line"></i>
              <div>
                <h3>First-Time Voter</h3>
                <p>Perfect for beginners. Extra tips and simple explanation modes.</p>
              </div>
            </div>
            
            <div class="profile-card ${selectedRole === 'Student' ? 'selected' : ''}" data-role="Student">
              <i class="ri-graduation-cap-line"></i>
              <div>
                <h3>Student / Youth</h3>
                <p>Focuses on campus registration, voting rules, and study guides.</p>
              </div>
            </div>
            
            <div class="profile-card ${selectedRole === 'General Citizen' ? 'selected' : ''}" data-role="General Citizen">
              <i class="ri-community-line"></i>
              <div>
                <h3>General Citizen</h3>
                <p>Quick lookup for booth finders, rules changes, and secure counts.</p>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="text-btn" id="back-btn-2"><i class="ri-arrow-left-line"></i> Back</button>
            <button class="primary-btn" id="next-btn-2">Continue</button>
          </div>
        `;

        // Speak the step
        app.speakText("Who are you voting as? First-time voter, student, or general citizen?");

        // Role select listeners
        card.querySelectorAll('.profile-card').forEach(pCard => {
          pCard.addEventListener('click', () => {
            selectedRole = pCard.getAttribute('data-role');
            card.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
            pCard.classList.add('selected');
            app.speakText(selectedRole);
          });
        });

        card.querySelector("#back-btn-2").addEventListener("click", () => {
          currentStep = 1;
          renderStep();
        });

        card.querySelector("#next-btn-2").addEventListener("click", () => {
          currentStep = 3;
          renderStep();
        });

      } else if (currentStep === 3) {
        // Name configuration
        card.innerHTML = `
          <h2>What is your name?</h2>
          <p>Let's personalize your companion interface. Enter your name or nickname.</p>
          
          <div class="onboarding-inputs">
            <input type="text" id="username-input" placeholder="e.g. Alex" value="${userName}" maxlength="20" autofocus />
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center;">
            <button class="text-btn" id="back-btn-3"><i class="ri-arrow-left-line"></i> Back</button>
            <button class="primary-btn" id="next-btn-3">Complete Profile</button>
          </div>
        `;

        app.speakText("What is your name?");

        card.querySelector("#back-btn-3").addEventListener("click", () => {
          currentStep = 2;
          renderStep();
        });

        const input = card.querySelector("#username-input");
        card.querySelector("#next-btn-3").addEventListener("click", () => {
          userName = input.value.trim();
          if (!userName) userName = "Citizen";
          
          // Complete Onboarding
          app.state.user.name = userName;
          app.state.user.role = selectedRole;
          app.state.onboardingComplete = true;
          
          // Provide default badges for starting out
          app.state.user.earnedBadges.push("explorer");
          
          app.saveState();
          app.hideOnboarding();
          app.bootstrapComponents();
          
          // Welcome message voice
          setTimeout(() => {
            app.speakText(`Welcome aboard ${userName}! You have unlocked your first achievement badge, Explorer. Let's begin the voter journey.`);
          }, 600);
        });

        // Trigger on enter key
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            card.querySelector("#next-btn-3").click();
          }
        });
      }
    };

    renderStep();
  }
};
