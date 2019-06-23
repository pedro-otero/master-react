describe('Playback Info', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=playback-info--default');
    cy.contains('Give It To Me');

    cy.visit('http://localhost:9001/iframe.html?id=playback-info--wrapped-texts');
    cy.contains('If this title is too long');
  });
});
