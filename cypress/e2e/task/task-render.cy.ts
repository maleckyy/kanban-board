describe('Task page e2e', () => {
    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
    })

    it('page header render correctly', () => {
        cy.getByTestId("task-header").should("exist").contains("Tasks")
    })

    it('table renders correctly', () => {
        cy.getByTestId("task-table").should("exist").contains("All tasks")
        cy.get('h2').contains('All tasks').should('exist')
        cy.get('button').contains('Add').should('exist')

        cy.get('th').contains('Status').should('exist').should('be.visible')
        cy.get('th').contains('Task name').should('exist').should('be.visible')
        cy.get('th').contains('Description').should('exist').should('be.visible')
        cy.get('th').get('button').contains('Delete selected').should('exist').should('be.visible')
    })

    it('add button should be always active', () => {
        cy.contains('button', 'Add').should('be.visible').should('not.be.disabled')
    })

    it('delete selected button should be disabled on loads', () => {
        cy.contains('button', 'Delete selected').should('be.visible').should('be.disabled')
    })
})

describe('Task card tests', () => {
    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
    })

    it('badge shows correct tasks amount', () => {
        const taskData = {
            name: 'Task name',
            desc: 'Task desc'
        }

        cy.getByTestId('task-card-header').contains('0/0')
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
        cy.getByTestId('task-card-header').contains('0/1')
    })

    it('badge shows correct tasks amount after check task', () => {
        const taskData = {
            name: 'Task name',
            desc: 'Task desc'
        }

        cy.getByTestId('task-card-header').contains('0/0')
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
        cy.get('td').find('input[type="checkbox"]').as('checkbox').should('not.be.checked')
        cy.get('@checkbox').click({ force: true })
        cy.getByTestId('task-card-header').contains('1/1')
    })
})