describe('Banner', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=banner--without-class-name');
    cy.contains('The banner is as big as its content');

    cy.visit('http://localhost:9001/iframe.html?id=banner--with-class-name');
    cy.contains('You can pass a classname');
  });
});
