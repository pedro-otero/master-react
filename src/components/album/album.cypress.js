describe('Album', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=album--album-and-artist-loaded');
    cy.contains('The Band');
    cy.contains('Hyped EP');

    cy.visit('http://localhost:9001/iframe.html?id=album--full');
    cy.contains('Mr. Frontman, Goto Producer');
    cy.contains('Mr. Frontman, The Drummer');
  });
});
