describe('Album', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=album--album-loaded');
    cy.contains('The Band');
    cy.contains('Hyped EP');

    cy.visit('http://localhost:9001/iframe.html?id=album--artist-loaded');
    cy.get('div[src="https://i.scdn.co/image/02bd189433691a8eb843f7bc3a82d8355938469a"]');

    cy.visit('http://localhost:9001/iframe.html?id=album--some-credits-found');
    cy.contains('Mr. Frontman, Goto Producer');

    cy.visit('http://localhost:9001/iframe.html?id=album--full');
    cy.contains('Mr. Frontman, The Drummer');
  });
});
