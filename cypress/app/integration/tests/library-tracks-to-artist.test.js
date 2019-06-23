describe('Navigate from user tracks to album to artist', () => {
  it('Gets to the artist', () => {
    cy.server();
    cy.route('GET', '**/v1/me', 'fixture:profile.json').as('profile');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json').as('playback');
    cy.route('GET', '**/v1/me/tracks?offset=0&limit=20', 'fixture:library/tracks-1.json').as('tracks-1');
    cy.route('GET', '**/v1/me/tracks?offset=20&limit=20', 'fixture:library/tracks-2.json').as('tracks-2');
    cy.route('GET', '**/v1/tracks/T1', 'fixture:tracks/T1.json').as('track');
    cy.route('GET', '**/v1/albums/L1', 'fixture:albums/L1.json').as('album');
    cy.route('GET', '**/v1/artists/R1', 'fixture:artists/R1.json').as('artist');
    cy.route('GET', '**/data/album/L1', 'fixture:searches/L1.json').as('search');
    cy.route('GET', '**/v1/artists/R1/albums?offset=0&limit=20', 'fixture:artists/R1-albums.json').as('artist-albums');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');
    cy.visit('localhost:3000');
    cy.wait('@profile');
    cy.wait('@playback');

    cy.get('a[href="/user/tracks"] > div:first').click();
    cy.wait('@tracks-1');
    cy.wait('@tracks-2');

    cy.get('a[href="/track/T1"] > div:first').click();
    cy.wait('@track');
    cy.wait('@album');
    cy.wait('@artist');
    cy.wait('@search');

    cy.get('a[href="/album/L1"] > div:first').click();
    cy.get('a[href="/artist/R1"] > span:first').click();
    cy.wait('@artist-albums');

    cy.contains('Singles (1)');
  });
});
