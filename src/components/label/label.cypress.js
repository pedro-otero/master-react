describe('Label', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=label--default');
    cy.contains('A label');

    cy.visit('http://localhost:9001/iframe.html?id=label--with-class');
    cy.contains('Another label');
  });
});
