describe('View', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=view--failed');
    cy.contains('And this one is the failedMessage prop');

    cy.visit('http://localhost:9001/iframe.html?id=view--all-ok');
    cy.contains('View is a component that displays any full view in the app');
  });
});
