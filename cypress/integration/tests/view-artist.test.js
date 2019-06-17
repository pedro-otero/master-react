describe('View artists', () => {
  it('Displays artists', () => {
    cy.server();
    cy.route('GET', '**/v1/me', 'fixture:profile.json').as('profile');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json').as('playback');
    cy.route('GET', '**/v1/artists/R1', 'fixture:artists/R1.json').as('artist');
    cy.route('GET', '**/v1/artists/R1/albums?offset=0&limit=20', 'fixture:artists/R1-albums.json').as('albums');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');
    cy.visit('localhost:3000/artist/R1');
    cy.wait('@profile');
    cy.wait('@playback');
    cy.wait('@artist');
    cy.wait('@albums');

    cy.contains('Mr Artist');
    cy.contains('Albums (1)');
    cy.contains('Singles (1)');
  });
});
