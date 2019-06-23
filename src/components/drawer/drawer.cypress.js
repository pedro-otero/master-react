describe('Drawer', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=drawer--default-in-a-500px-x-500px-div');
    cy.contains('A drawer can take any element or options');
  });
});
