describe('Artist', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=artist--with-albums');
    cy.contains('Somebody Famous');
    cy.contains('Albums (5)');

    cy.visit('http://localhost:9001/iframe.html?id=artist--with-no-albums');
    cy.contains('Somebody Famous');
  });
});
