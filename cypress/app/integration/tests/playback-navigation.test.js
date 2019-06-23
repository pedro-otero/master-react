describe('Navigation from playback info', () => {
  it('Goes to track in playback', () => {
    cy.server();

    cy.route('GET', '**/v1/me', 'fixture:profile.json');
    cy.route('GET', '**/v1/me/player', 'fixture:playbackInfo.json');
    cy.route('GET', '**/v1/tracks/T1', 'fixture:tracks/T1.json');
    cy.route('GET', '**/v1/albums/L1', 'fixture:albums/L1.json');
    cy.route('GET', '**/v1/artists/R1', 'fixture:artists/R1.json');
    cy.route('GET', '**/data/album/L1', 'fixture:searches/L1.json');

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');

    cy.get('a[href="/track/T1"] > div:first').click();

    // If we get to see these credits it means we made it to the track
    cy.contains('Flute, Guitar');
  });
});
