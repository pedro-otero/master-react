describe('View user tracks', () => {
  it('Loads all pages until finished', () => {
    cy.server();
    cy.route('GET', '**/v1/me', 'fixture:profile.json').as('profile');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json').as('playback');
    cy.route('GET', '**/v1/me/tracks?offset=0&limit=20', 'fixture:library/tracks-1.json').as('tracks-1');
    cy.route('GET', '**/v1/me/tracks?offset=20&limit=20', 'fixture:library/tracks-2.json').as('tracks-2');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');
    cy.visit('localhost:3000/user/tracks');
    cy.wait('@profile');
    cy.wait('@playback');
    cy.wait('@tracks-1');
    cy.wait('@tracks-2');

    cy.contains('First track');
    cy.contains('Second track');
  });
});
