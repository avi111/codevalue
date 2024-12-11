describe('Product Management App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays initial products', () => {
    cy.contains('Laptop Pro');
    cy.contains('Wireless Headphones');
  });

  it('can add a new product', () => {
    cy.contains('Add Product').click();
    cy.get('input[name="name"]').type('Test Product');
    cy.get('input[name="price"]').type('99.99');
    cy.contains('Save').click();
    cy.contains('Test Product');
  });

  it('can delete a product', () => {
    cy.contains('Delete').first().click();
    cy.contains('Laptop Pro').should('not.exist');
  });

  it('can search products', () => {
    cy.get('input[label="Search"]').type('Laptop');
    cy.contains('Laptop Pro');
    cy.contains('Wireless Headphones').should('not.exist');
  });

  it('can sort products', () => {
    cy.get('[label="Sort By"]').click();
    cy.contains('Name').click();
    cy.get('.MuiCard-root').first().should('contain', 'Laptop Pro');
  });
});