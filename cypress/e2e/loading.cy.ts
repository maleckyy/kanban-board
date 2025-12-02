describe('Loading page', () => {
  it('render loading page', () => {
    cy.visit('http://localhost:5173/')
  })

  it('loading page should redirect to dashboard after 5s', () => {
    cy.visit('http://localhost:5173/')
    cy.wait(5000)
    cy.url().should('include', '/app')
  })
})

