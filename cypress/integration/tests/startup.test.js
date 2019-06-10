describe('Crews', () => {
  it('Shows welcome page', () => {
    cy.visit(`localhost:3000`);
    cy.contains('Login');
  });

  it('Logs in', () => {
    cy.server();

    cy.route({
      url: '**/v1/me',
      response: {
        display_name: 'BadLuck Brian',
        id: 'bad_luck_brian_99',
        images: [{
          url: 'https://i.imgflip.com/wahid.jpg',
        }],
      },
    });

    cy.route({
      url: '**/v1/me/player',
      response: {
        item: {
          id: 'T1',
          name: 'Some Track',
          artists: [{ name: 'Mr Artist' }],
          album: {
            images: [{
              url: 'https://i.imgflip.com/wahid.jpg',
            }],
          },
        },
      },
    });

    cy.visit('localhost:3000/#access_token=FAKE_TOKEN&expires_in=123456789');

    cy.contains('BadLuck Brian');
    cy.contains('@bad_luck_brian_99');

    cy.get('h1').should('contain', 'Hey BadLuck');
    cy.get('h3').should('contain', 'AKA bad_luck_brian_99');

    cy.get('a[href="/track/T1').get('strong').should('contain', 'Some Track');
    cy.get('a[href="/track/T1').get('small').should('contain', 'Artist');
  });
});
