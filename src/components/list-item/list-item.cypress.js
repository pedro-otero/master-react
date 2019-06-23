describe('List Item', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=list-item--list-of-demo-items');
    cy.contains('This is a list item');
  });
});
