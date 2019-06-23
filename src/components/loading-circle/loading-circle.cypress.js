describe('Loading Circle', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=loading-circle--default');
    cy.get('div[class="loading-circle__sk-circle12 loading-circle__skCircle"]');

    cy.visit('http://localhost:9001/iframe.html?id=loading-circle--with-message');
    cy.contains('With a message');
  });
});
