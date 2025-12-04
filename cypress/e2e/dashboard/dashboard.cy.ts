describe('Dashboard e2e', () => {
    beforeEach(() => {
        cy.gotoMainPage()
        cy.shouldBeOnPage("/app")
    })

    it('page render correctly', () => {
        cy.getByTestId("dashboard-header").should('exist').should('be.visible')
        cy.getByTestId("completed-tasks-card").should('exist').should('be.visible')
    })
})