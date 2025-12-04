describe('Navbar e2e', () => {
    it('navbar render correctly', () => {
        cy.gotoMainPage()
        cy.getByTestId("app-navbar").should('be.visible')
    })

    it('navbar render links correctly', () => {
        cy.gotoMainPage()
        cy.get('li').contains('Dashboard').should('exist')
        cy.get('summary').contains('Boards').should('exist')
        cy.get('li').contains('Tasks').should('exist')
        cy.get('li').contains('Data').should('exist')

    })
})

describe('Navbar links', () => {
    it('dashboard link redirect to /app', () => {
        cy.gotoMainPage()
        cy.visit('http://localhost:5173/app/task')
        const dashboardLink = cy.get('li').contains('Dashboard')
        dashboardLink.should('exist')
        dashboardLink.click()
        cy.shouldBeOnPage("/app")
    })

    it('tasks link redirect to /app/task', () => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
        cy.shouldBeOnPage("/app/task")
    })

    it('data link redirect to /app/data', () => {
        cy.gotoMainPage()
        const dataLink = cy.get('li').contains('Data')
        dataLink.should('exist')
        dataLink.click()
        cy.shouldBeOnPage("/app/data")
    })
})