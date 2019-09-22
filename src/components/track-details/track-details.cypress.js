describe('Track Details', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=track-details--with-spotify-data-loaded');
    cy.contains('Char Topper Everybody\'s Sick Of');
    cy.contains('2016');
    cy.contains('Pop Master');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--full');
    cy.contains('Realname Ofpopmaster');
    cy.contains('Backing Vocals');
    cy.contains('Guy Bass');
  });
});
