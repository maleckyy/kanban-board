describe('Add task modal e2e', () => {
    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
    })

    it('modal should be visible after clicking Add button', () => {
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').should('be.visible')
    })

    it('modal should close after clicking exit button', () => {
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').should('exist').should('be.visible')
        cy.getByTestId('close-modal-button').should('be.visible').click()
        cy.getByTestId('add-task-modal').should('not.exist')
    })

    it('modal should display form correctly', () => {
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').should('exist').should('be.visible')
        cy.contains('h2', 'Add new task').should('be.visible')
        cy.get('input[name="task-title"]').should('be.visible')
        cy.get('textarea[name="task-desc"]').should('be.visible')
        cy.getByTestId('add-task-modal').contains('button', 'Add').should('be.visible')
    })
})