describe('Full Application', () => {
  it('Stories', () => {
    cy.visit('http://localhost:9001/iframe.html?id=crews--failure-to-load-album');
    cy.contains('Could not load this album');

    cy.visit('http://localhost:9001/iframe.html?id=crews--failure-to-load-artist');
    cy.contains('Could not load this artist');

    cy.visit('http://localhost:9001/iframe.html?id=crews--startup');
    cy.contains('Hey User');

    cy.visit('http://localhost:9001/iframe.html?id=crews--failure-to-load-track');
    cy.contains('Could not load this track');

    cy.visit('http://localhost:9001/iframe.html?id=crews--with-a-track-playing');
    cy.contains('A song');

    cy.visit('http://localhost:9001/iframe.html?id=crews--user-saved-tracks');
    cy.contains('Adjective Noun');

    cy.visit('http://localhost:9001/iframe.html?id=crews--viewing-an-album');
    cy.contains('Sophomore');

    cy.visit('http://localhost:9001/iframe.html?id=crews--viewing-an-artist');
    cy.contains('One Hit Wonder');

    cy.visit('http://localhost:9001/iframe.html?id=crews--viewing-a-track');
    cy.contains('Radio Friendly');
  });
});
