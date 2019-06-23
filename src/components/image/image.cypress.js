describe('Image', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=image--tweak-it');
    cy.get('div[src="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"]');
  });
});
