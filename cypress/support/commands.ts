Cypress.Commands.add('getByTestId', (id: string) => {
    return cy.get(`[data-testid="${id}"]`)
})

Cypress.Commands.add('gotoMainPage', () => {
    return cy.visit('http://localhost:5173/app')
})

Cypress.Commands.add('shouldBeOnPage', (path: string) => {
    cy.location('pathname').should('eq', path)
})