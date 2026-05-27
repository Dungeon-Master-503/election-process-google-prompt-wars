// js/components/Security.js

export const Security = {
  init(app) {
    this.app = app;
    this.container = document.getElementById('view-security');
    this.render();
  },

  render() {
    this.container.innerHTML = ""; // Clear existing panel markup

    // Intro panel
    const intro = document.createElement('div');
    intro.className = 'glass-panel';
    intro.innerHTML = `
      <h3 style="font-family: var(--font-header); font-size: 1.3rem; margin-bottom: 8px; color: var(--text-white);">
        <i class="ri-shield-check-line" style="color: var(--accent-cyan);"></i> Democracy Built on Trust & Security
      </h3>
      <p style="font-size: 0.9rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 12px;">
        Elections are designed to be transparent, verifiable, and secure at every level. The integrity of your ballot is protected through strict physical security, bipartisan controls, offline networks, and randomized hand-audits of paper records.
      </p>
    `;
    this.container.appendChild(intro);

    // Ballot Journey Flowchart
    const flowchartHeader = document.createElement('h3');
    flowchartHeader.style.cssText = "font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white); margin: 30px 0 10px 0; border-left: 3px solid var(--accent-cyan); padding-left: 8px;";
    flowchartHeader.innerText = "The Journey of a Ballot";
    this.container.appendChild(flowchartHeader);

    const flowchart = document.createElement('div');
    flowchart.className = 'ballot-flow';
    flowchart.innerHTML = `
      <div class="ballot-flow-node" id="fn-1">
        <i class="ri-edit-box-line"></i>
        <h4>1. Ballot Cast</h4>
        <p>User marks paper ballot. Scanner reads vote offline. Paper drops into locked safe.</p>
      </div>

      <div class="ballot-arrow"><i class="ri-arrow-right-line"></i></div>

      <div class="ballot-flow-node" id="fn-2">
        <i class="ri-truck-line"></i>
        <h4>2. Secure Transport</h4>
        <p>Locked boxes are sealed. Transported by bipartisan officials with chain logs.</p>
      </div>

      <div class="ballot-arrow"><i class="ri-arrow-right-line"></i></div>

      <div class="ballot-flow-node" id="fn-3">
        <i class="ri-cpu-line"></i>
        <h4>3. Central Count</h4>
        <p>Scanned results tabulated on strict offline county networks in public view.</p>
      </div>

      <div class="ballot-arrow"><i class="ri-arrow-right-line"></i></div>

      <div class="ballot-flow-node" id="fn-4">
        <i class="ri-award-line"></i>
        <h4>4. Random Audit</h4>
        <p>Randomly selected paper ballots are hand-counted to confirm machine accuracy.</p>
      </div>
    `;
    
    // Voice description triggers for flowchart nodes
    flowchart.querySelectorAll('.ballot-flow-node').forEach(node => {
      node.addEventListener('mouseenter', () => {
        const text = node.querySelector('h4').innerText + ". " + node.querySelector('p').innerText;
        this.app.speakText(text);
      });
    });

    this.container.appendChild(flowchart);

    // Security pillars cards list
    const pillarsHeader = document.createElement('h3');
    pillarsHeader.style.cssText = "font-family: var(--font-header); font-size: 1.1rem; color: var(--text-white); margin: 40px 0 16px 0; border-left: 3px solid var(--accent-cyan); padding-left: 8px;";
    pillarsHeader.innerText = "Key Safeguards Explained";
    this.container.appendChild(pillarsHeader);

    const pillarsGrid = document.createElement('div');
    pillarsGrid.className = 'widgets-grid';
    pillarsGrid.innerHTML = `
      <div class="glass-panel" style="margin-bottom:0;">
        <h4 style="font-family: var(--font-header); font-size: 1rem; color: var(--accent-cyan); margin-bottom: 8px;">
          <i class="ri-draft-line"></i> Paper Audit Trail
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
          Every single electronic vote scanner is backed by a physical, hand-marked paper ballot. Even if a machine malfunctioned or lost power, the paper ballot is the official vote of record. This paper trial makes silent tampering impossible.
        </p>
      </div>

      <div class="glass-panel" style="margin-bottom:0;">
        <h4 style="font-family: var(--font-header); font-size: 1rem; color: var(--accent-cyan); margin-bottom: 8px;">
          <i class="ri-router-line"></i> Air-Gapped Tabulators
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
          Voting machines, counting computers, and databases are strictly air-gapped — meaning they are physically disconnected from the internet and local Wi-Fi. Since there is no internet connection, remote hackers cannot access the systems.
        </p>
      </div>

      <div class="glass-panel" style="margin-bottom:0;">
        <h4 style="font-family: var(--font-header); font-size: 1rem; color: var(--accent-cyan); margin-bottom: 8px;">
          <i class="ri-user-follow-line"></i> Bipartisan Custody
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
          No single person is ever left alone with ballots or tabulators. Every step — printing, distributing, tracking, scanning, and auditing — is handled by teams containing members of opposing political parties working together under oath.
        </p>
      </div>

      <div class="glass-panel" style="margin-bottom:0;">
        <h4 style="font-family: var(--font-header); font-size: 1rem; color: var(--accent-cyan); margin-bottom: 8px;">
          <i class="ri-eye-line"></i> Public Observability
        </h4>
        <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
          Tabulation rooms are open to public observers and political party representatives. Many jurisdictions broadcast live video feeds of the processing rooms. Transparency ensures that counting can be verified by the community.
        </p>
      </div>
    `;
    this.container.appendChild(pillarsGrid);
  }
};
