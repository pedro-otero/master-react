describe('Saved Tracks', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=saved-tracks--default');
    cy.contains('First Single');
  });
});
