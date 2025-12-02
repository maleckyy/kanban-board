describe('Dashboard e2e', () => {
    it('page render correctly', () => {
        cy.visit('http://localhost:5173/app')
        cy.getByTestId("dashboard-header").should('be.visible')
        cy.getByTestId("completed-tasks-card").should('be.visible')
    })
})