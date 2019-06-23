describe('Welcome', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=welcome--default');
    cy.contains('You need to login to Spotify to use this app.');
  });
});
