describe('Menu', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=menu--default');
    cy.contains('Someone McSomething');
  });
});
