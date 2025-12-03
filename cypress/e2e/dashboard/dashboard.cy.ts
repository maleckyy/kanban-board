describe('Dashboard e2e', () => {
    it('page render correctly', () => {
        cy.gotoMainPage()
        cy.shouldBeOnPage("/app")
        cy.getByTestId("dashboard-header").should('be.visible')
        cy.getByTestId("completed-tasks-card").should('be.visible')
    })
})