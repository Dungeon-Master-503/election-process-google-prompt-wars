// js/components/Widgets.js

export const Widgets = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-widgets');
    
    // Cleanup existing interval if re-initializing
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }

    this.render();
    this.startCountdown();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Grid Layout for Widgets
    const grid = document.createElement('div');
    grid.className = 'widgets-grid';
    this.container.appendChild(grid);

    // 1. Countdown Widget
    const countdownCard = document.createElement('div');
    countdownCard.className = 'glass-panel';
    countdownCard.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white);">
        <i class="ri-alarm-warning-line" style="color: var(--accent-cyan);"></i> General Election Countdown
      </h3>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Days left until polls open on November 3, 2026.</p>
      <div class="countdown-container">
        <div class="countdown-unit">
          <div class="countdown-num" id="cd-days">00</div>
          <div class="countdown-lbl">Days</div>
        </div>
        <div class="countdown-unit">
          <div class="countdown-num" id="cd-hours">00</div>
          <div class="countdown-lbl">Hrs</div>
        </div>
        <div class="countdown-unit">
          <div class="countdown-num" id="cd-mins">00</div>
          <div class="countdown-lbl">Mins</div>
        </div>
        <div class="countdown-unit">
          <div class="countdown-num" id="cd-secs">00</div>
          <div class="countdown-lbl">Secs</div>
        </div>
      </div>
    `;
    grid.appendChild(countdownCard);

    // 2. Registration Status Lookup Widget
    const statusCard = document.createElement('div');
    statusCard.className = 'glass-panel';
    statusCard.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white);">
        <i class="ri-user-search-line" style="color: var(--accent-gold);"></i> Registration Status Checker
      </h3>
      <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">Verify your current status in the national database.</p>
      
      <div class="widget-form">
        <select class="widget-input" id="reg-state">
          <option value="">Select State / Region...</option>
          <option value="CA">California</option>
          <option value="NY">New York</option>
          <option value="TX">Texas</option>
          <option value="FL">Florida</option>
          <option value="OH">Ohio</option>
        </select>
        <input type="text" class="widget-input" id="reg-name" placeholder="Full Legal Name (as registered)..." />
        <button class="widget-btn" id="reg-check-btn">Verify Status</button>
      </div>

      <div class="widget-result-box" id="reg-result-display">
        <!-- Results print here -->
      </div>
    `;
    grid.appendChild(statusCard);

    // Bind registration checker logic
    statusCard.querySelector('#reg-check-btn').addEventListener('click', () => {
      this.checkRegistrationStatus(statusCard);
    });

    // 3. Polling Place Locator Widget
    const locatorCard = document.createElement('div');
    locatorCard.className = 'glass-panel';
    locatorCard.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white);">
        <i class="ri-map-pin-line" style="color: var(--accent-green);"></i> Polling Place Locator HUD
      </h3>
      <p style="font-size: 0.8rem; color: var(--text-muted);">Enter address to find assigned location.</p>
      
      <div class="widget-form" style="flex-direction: row; gap: 8px;">
        <input type="text" class="widget-input" id="loc-zip" placeholder="Enter Address or ZIP..." style="margin-top:0;" />
        <button class="widget-btn" id="loc-find-btn" style="white-space:nowrap; padding: 0 16px;">Search</button>
      </div>

      <div id="locator-map-placeholder" style="display:none;">
        <div class="mock-map-hud">
          <div class="map-radar-ring"></div>
          <i class="ri-map-pin-2-fill map-pin"></i>
          <div class="map-info-tag" id="map-location-tag">
            <strong>Precinct 14-A:</strong> Loading location details...
          </div>
        </div>
      </div>
    `;
    grid.appendChild(locatorCard);

    // Bind locator map launch
    locatorCard.querySelector('#loc-find-btn').addEventListener('click', () => {
      this.findPollingBooth(locatorCard);
    });

    // 4. Historical Voter Turnout Stats & Results Live Widget
    const statsCard = document.createElement('div');
    statsCard.className = 'glass-panel';
    statsCard.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white);">
        <i class="ri-bar-chart-2-line" style="color: var(--accent-purple);"></i> Visual Dashboards
      </h3>
      
      <!-- Chart tabs -->
      <div style="display: flex; gap: 8px; margin-top: 10px; border-bottom: 1px solid var(--border-glass); padding-bottom: 8px;">
        <button class="tab-btn active" id="btn-chart-turnout" style="padding: 4px 10px; font-size: 0.75rem;">Voter Turnout</button>
        <button class="tab-btn" id="btn-chart-results" style="padding: 4px 10px; font-size: 0.75rem;">Live Mock Results</button>
      </div>

      <!-- Turnout graph panel -->
      <div id="chart-turnout-panel">
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">
          National voter turnout trends over recent general elections:
        </p>
        <div class="svg-chart-container">
          <svg viewBox="0 0 320 160" width="100%" height="100%">
            <!-- X Axis Grid Lines -->
            <line x1="30" y1="120" x2="300" y2="120" stroke="rgba(255,255,255,0.15)"></line>
            
            <!-- Bar 1 (2012) -->
            <rect class="bar-hoverable" x="50" y="50" width="30" height="70" fill="var(--accent-purple)" opacity="0.8" rx="3"></rect>
            <text x="65" y="135" fill="var(--text-muted)" font-size="9" text-anchor="middle">2012</text>
            <text x="65" y="44" fill="var(--text-white)" font-size="9" font-weight="bold" text-anchor="middle">58.6%</text>

            <!-- Bar 2 (2016) -->
            <rect class="bar-hoverable" x="110" y="48" width="30" height="72" fill="var(--accent-purple)" opacity="0.8" rx="3"></rect>
            <text x="125" y="135" fill="var(--text-muted)" font-size="9" text-anchor="middle">2016</text>
            <text x="125" y="42" fill="var(--text-white)" font-size="9" font-weight="bold" text-anchor="middle">60.1%</text>

            <!-- Bar 3 (2020) -->
            <rect class="bar-hoverable" x="170" y="32" width="30" height="88" fill="var(--accent-cyan)" opacity="0.9" rx="3"></rect>
            <text x="185" y="135" fill="var(--text-muted)" font-size="9" text-anchor="middle">2020</text>
            <text x="185" y="26" fill="var(--text-white)" font-size="9" font-weight="bold" text-anchor="middle">66.8%</text>

            <!-- Bar 4 (2024) -->
            <rect class="bar-hoverable" x="230" y="30" width="30" height="90" fill="var(--accent-teal)" opacity="0.9" rx="3"></rect>
            <text x="245" y="135" fill="var(--text-muted)" font-size="9" text-anchor="middle">2024</text>
            <text x="245" y="24" fill="var(--text-white)" font-size="9" font-weight="bold" text-anchor="middle">67.3%</text>
          </svg>
        </div>
      </div>

      <!-- Results progress bars panel -->
      <div id="chart-results-panel" style="display:none;">
        <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 8px;">
          Mock results simulation (98% Reporting):
        </p>
        <div class="results-live-tracker">
          <div class="results-bar-container">
            <div class="results-lbl-row">
              <span class="party-name dem">Candidate A (Democratic Style)</span>
              <span class="party-pct">49.2%</span>
            </div>
            <div class="results-track">
              <div class="results-fill dem" id="live-fill-dem" style="width: 0%;"></div>
            </div>
          </div>

          <div class="results-bar-container">
            <div class="results-lbl-row">
              <span class="party-name rep">Candidate B (Republican Style)</span>
              <span class="party-pct">50.8%</span>
            </div>
            <div class="results-track">
              <div class="results-fill rep" id="live-fill-rep" style="width: 0%;"></div>
            </div>
          </div>
        </div>
        
        <div style="margin-top:14px; text-align: center;">
          <button class="msg-action-btn" id="simulate-swing-btn">
            <i class="ri-refresh-line"></i> Simulate Swing States
          </button>
        </div>
      </div>
    `;
    grid.appendChild(statsCard);

    // Bind charts switching tabs
    const btnTurnout = statsCard.querySelector('#btn-chart-turnout');
    const btnResults = statsCard.querySelector('#btn-chart-results');
    const panelTurnout = statsCard.querySelector('#chart-turnout-panel');
    const panelResults = statsCard.querySelector('#chart-results-panel');

    btnTurnout.addEventListener('click', () => {
      btnTurnout.classList.add('active');
      btnResults.classList.remove('active');
      panelTurnout.style.display = "block";
      panelResults.style.display = "none";
    });

    btnResults.addEventListener('click', () => {
      btnResults.classList.add('active');
      btnTurnout.classList.remove('active');
      panelTurnout.style.display = "none";
      panelResults.style.display = "block";
      
      // Animate progress bars on tab view
      setTimeout(() => {
        statsCard.querySelector('#live-fill-dem').style.width = "49.2%";
        statsCard.querySelector('#live-fill-rep').style.width = "50.8%";
      }, 100);
    });

    // Swing states simulation
    statsCard.querySelector('#simulate-swing-btn').addEventListener('click', () => {
      const demPctVal = 47 + Math.random() * 6; // random between 47 and 53
      const repPctVal = 100 - demPctVal;
      
      statsCard.querySelector('#live-fill-dem').style.width = `${demPctVal}%`;
      statsCard.querySelector('#live-fill-rep').style.width = `${repPctVal}%`;
      
      statsCard.querySelector('#chart-results-panel .results-live-tracker .results-bar-container:nth-child(1) .party-pct').innerText = `${demPctVal.toFixed(1)}%`;
      statsCard.querySelector('#chart-results-panel .results-live-tracker .results-bar-container:nth-child(2) .party-pct').innerText = `${repPctVal.toFixed(1)}%`;

      this.app.speakText(`Simulating Swing States. Candidate A currently holds ${demPctVal.toFixed(1)}% of votes. Candidate B holds ${repPctVal.toFixed(1)}%`);
    });
  },

  // --- Live Countdown calculations ---
  startCountdown() {
    // Target date: November 3, 2026
    const target = new Date("November 3, 2026 07:00:00").getTime();

    const updateClock = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference < 0) {
        clearInterval(this.countdownInterval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('cd-days');
      const hoursEl = document.getElementById('cd-hours');
      const minsEl = document.getElementById('cd-mins');
      const secsEl = document.getElementById('cd-secs');

      if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
      if (minsEl) minsEl.innerText = String(mins).padStart(2, '0');
      if (secsEl) secsEl.innerText = String(secs).padStart(2, '0');
    };

    updateClock(); // Initial run
    this.countdownInterval = setInterval(updateClock, 1000);
  },

  // --- Mock Database Verification check ---
  checkRegistrationStatus(card) {
    const stateVal = card.querySelector('#reg-state').value;
    const nameVal = card.querySelector('#reg-name').value.trim();
    const resultBox = card.querySelector('#reg-result-display');

    if (!stateVal || !nameVal) {
      resultBox.innerHTML = `
        <span style="color:var(--accent-red); font-size:0.75rem;">
          <i class="ri-alert-line"></i> Please select a state and input your legal name.
        </span>
      `;
      resultBox.className = "widget-result-box show";
      this.app.speakText("Error: Please select a state and input your legal name.");
      return;
    }

    resultBox.innerHTML = `
      <div style="text-align: center; padding: 10px 0;">
        <span class="typing-indicator" style="display:inline-flex;"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>
        <span style="font-size:0.75rem; color: var(--text-muted); margin-left: 6px;">Contacting local board archives...</span>
      </div>
    `;
    resultBox.className = "widget-result-box show";

    setTimeout(() => {
      // Create mockup receipt
      const numCode = Math.floor(10000000 + Math.random() * 90000000);
      resultBox.innerHTML = `
        <div style="border-left: 3px solid var(--accent-green); padding-left: 8px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 6px;">
            <span style="color: var(--accent-green); font-weight:700; font-size: 0.8rem;">● STATUS ACTIVE</span>
            <span style="font-size:0.65rem; color: var(--text-muted);">ID: #${numCode}</span>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-white); margin-bottom: 2px;">Name: <strong>${nameVal}</strong></p>
          <p style="font-size: 0.75rem; color: var(--text-white); margin-bottom: 4px;">State Precinct: <strong>${stateVal}</strong></p>
          <p style="font-size: 0.65rem; color: var(--text-muted); line-height:1.3;">Registered since: 10/12/2022. You are certified to vote in local and federal elections.</p>
        </div>
      `;
      this.app.speakText(`Verification complete. Status active for ${nameVal} in ${stateVal}.`);
    }, 1200);
  },

  // --- Mock Polling Booth radar locator ---
  findPollingBooth(card) {
    const query = card.querySelector('#loc-zip').value.trim();
    const mapPlaceholder = card.querySelector('#locator-map-placeholder');

    if (!query) {
      this.app.speakText("Error: Please enter a zip code or address.");
      alert("Please enter a zip code or address first!");
      return;
    }

    mapPlaceholder.style.display = "block";
    const tag = mapPlaceholder.querySelector('#map-location-tag');
    tag.innerHTML = `<strong>Precinct HUD:</strong> Scanning satellite databases...`;
    
    this.app.speakText("Scanning satellite databases for polling booths near " + query);

    setTimeout(() => {
      // Pick random wait time and booth name
      const waitTimes = [5, 12, 20, 30];
      const selectedWait = waitTimes[Math.floor(Math.random() * waitTimes.length)];
      
      const booths = [
        { name: "Oakwood High School Gym", addr: "450 Oakwood Ave" },
        { name: "Downtown Public Library Room B", addr: "100 Library Sq" },
        { name: "Community Recreation Center", addr: "1820 Park Blvd" },
        { name: "St. John's Church Basement", addr: "702 Church Street" }
      ];
      const selectedBooth = booths[Math.floor(Math.random() * booths.length)];

      tag.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
          <strong>${selectedBooth.name}</strong>
          <span style="color: ${selectedWait > 15 ? 'var(--accent-gold)' : 'var(--accent-green)'}; font-weight:700;">${selectedWait}-min wait</span>
        </div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${selectedBooth.addr} | Open 7AM - 8PM</div>
      `;

      this.app.speakText(`Booth found: ${selectedBooth.name} at ${selectedBooth.addr}. Current wait time is ${selectedWait} minutes.`);
    }, 1500);
  }
};
