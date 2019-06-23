describe('Progress Bar', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=progress-bar--big');
    cy.get('div[class="progress__progress progress__big-progress"]');

    cy.visit('http://localhost:9001/iframe.html?id=progress-bar--small');
    cy.get('div[class="progress__progress progress__small-progress"]');
  });
});
