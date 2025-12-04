describe('Loading page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('loading page should redirect to dashboard after 5s', () => {
    cy.wait(5000)
    cy.shouldBeOnPage("/app")
  })
})

