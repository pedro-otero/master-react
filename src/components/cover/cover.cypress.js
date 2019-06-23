describe('Cover', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=cover--default');
    cy.get('div[src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"]');

    cy.visit('http://localhost:9001/iframe.html?id=cover--with-yearclass');
    cy.contains('2008');
  });
});
