describe('View user albums', () => {
  it('Loads all pages until finished', () => {
    cy.server();
    cy.route('GET', '**/v1/me', 'fixture:profile.json').as('profile');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json').as('playback');
    cy.route('GET', '**/v1/me/albums?offset=0&limit=20', 'fixture:library/albums-1.json').as('albums-1');
    cy.route('GET', '**/v1/me/albums?offset=20&limit=20', 'fixture:library/albums-2.json').as('albums-2');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');
    cy.visit('localhost:3000/user/albums');
    cy.wait('@profile');
    cy.wait('@playback');
    cy.wait('@albums-1');
    cy.wait('@albums-2');

    cy.contains('First album');
    cy.contains('Second album');
  });
});
