describe('View albums', () => {
  it('Displays albums', () => {
    cy.server();
    cy.route('GET', '**/v1/me', 'fixture:profile.json').as('profile');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json').as('playback');
    cy.route('GET', '**/v1/albums/L1', 'fixture:albums/L1.json').as('album');
    cy.route('GET', '**/v1/artists/R1', 'fixture:artists/R1.json').as('artist');
    cy.route('GET', '**/data/album/L1', 'fixture:searches/L1.json').as('search');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');
    cy.visit('localhost:3000/album/L1');
    cy.wait('@profile');
    cy.wait('@playback');
    cy.wait('@album');
    cy.wait('@artist');
    cy.wait('@search');

    cy.contains('Some Track');
    cy.contains('(Composer #1, Composer #2)');
    cy.contains('0:01');
  });
});
