describe('Errors List', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=errors-list--default');
    cy.contains('This is an error');
  });
});
