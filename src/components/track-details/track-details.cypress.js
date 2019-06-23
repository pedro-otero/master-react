describe('Track Details', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=track-details--with-spotify-track-info');
    cy.contains('Char Topper Everybody\'s Sick Of');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--with-spotify-album-info');
    cy.contains('2016');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--with-spotify-artist-info');
    cy.contains('Pop Master');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--found-composers');
    cy.contains('Realname Ofpopmaster');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--found-credits');
    cy.contains('Backing Vocals');

    cy.visit('http://localhost:9001/iframe.html?id=track-details--full');
    cy.contains('Guy Bass');
  });
});
