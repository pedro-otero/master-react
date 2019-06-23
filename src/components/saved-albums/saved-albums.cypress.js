describe('Saved Albums', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=saved-albums--default');
    cy.contains('Sleeper Hit');
  });
});
