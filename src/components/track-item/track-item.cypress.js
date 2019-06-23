describe('Track Item', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=track-item--without-composers');
    cy.contains('Hot New Track');

    cy.visit('http://localhost:9001/iframe.html?id=track-item--with-composers');
    cy.contains('The one, The other');
  });
});
