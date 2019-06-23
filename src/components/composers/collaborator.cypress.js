describe('Composers List', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=composers-list--default');
    cy.contains('just, JointList, with, start & end');
  });
});
