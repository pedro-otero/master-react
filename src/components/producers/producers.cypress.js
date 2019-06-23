describe('Producers List', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=producers-list--default');
    cy.contains('[It\'s, just, JointList, with, start & end, set]');
  });
});
