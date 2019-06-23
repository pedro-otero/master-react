describe('Credits', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=credits-list--default');
    cy.contains('Beatbox');
  });
});
