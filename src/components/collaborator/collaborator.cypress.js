describe('Collaborator', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=collaborator--default');
    cy.contains('Some Guy');
  });
});
