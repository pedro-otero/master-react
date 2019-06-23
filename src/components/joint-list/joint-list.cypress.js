describe('Joint List', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=joint-list--just-values');
    cy.contains('A, list, joint, by, commnas');

    cy.visit('http://localhost:9001/iframe.html?id=joint-list--with-wrapping-chars');
    cy.contains('<You, can, wrap, it, in, anything>');

    cy.visit('http://localhost:9001/iframe.html?id=joint-list--with-class');
    cy.contains('(And, pass, a, modifier, class)');
  });
});
