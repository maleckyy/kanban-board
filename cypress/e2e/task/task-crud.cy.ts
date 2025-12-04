describe("Task Modal - add task", () => {
    const taskData = {
        name: 'Task name',
        desc: 'Task desc'
    }

    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
    })

    it("renders modal content correctly", () => {
        cy.get("@modal").find('input[name="task-title"]').should("exist")
        cy.get("@modal").find('textarea[name="task-desc"]').should("exist")
        cy.get("@modal").contains("button", "Add").should("be.disabled")
    })

    it("enables Add button when title is typed", () => {
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").contains("button", "Add").should('be.enabled')
    })

    it("add task after filling form and submit", () => {
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
    })

    it("does not submit if title is empty", () => {
        cy.get("@modal").find('input[name="task-title"]').clear()
        cy.get("@modal").find('textarea[name="task-desc"]').type("Some desc")
        cy.get("@modal").contains("button", "Add").should("be.disabled")
    })
})

describe("Task Modal - edit task", () => {
    const taskData = {
        name: 'Task name',
        desc: 'Task desc'
    }

    const updatedTaskData = {
        name: 'Task updated name',
        desc: 'Task updated desc'
    }

    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
    })

    it("renders inputs correctly on load", () => {
        cy.contains('td', taskData.name).should('be.visible')
        cy.getByTestId('task-dropdown-trigger').as('task-action-trigger').should('be.visible')
        cy.get("@task-action-trigger").click()
        cy.getByTestId("task-dropdown-menu").as('task-dropdown-content').should('be.visible')
        cy.get('@task-dropdown-content').contains('Edit').click()

        cy.getByTestId('edit-task-modal').as('edit-modal').should('be.visible')
        cy.contains('h2', 'Edit task').should('be.visible')
        cy.get('input[name="task-title"]').should('be.visible').should('have.value', taskData.name)
        cy.get('textarea[name="task-desc"]').should('be.visible').should('have.value', taskData.desc)
        cy.get("@edit-modal").find('input[name="task-title"]').clear().type(updatedTaskData.name)
        cy.get("@edit-modal").find('textarea[name="task-desc"]').clear().type(updatedTaskData.desc)
        cy.get('input[name="task-title"]').should('be.visible').should('have.value', updatedTaskData.name)
        cy.get('textarea[name="task-desc"]').should('be.visible').should('have.value', updatedTaskData.desc)
        cy.get("@edit-modal").contains("button", "Save").should("not.be.disabled").click()
        cy.contains('td', updatedTaskData.name).should('be.visible')
    })
})


describe("Task Modal - update status", () => {
    const taskData = {
        name: 'Task name',
        desc: 'Task desc'
    }

    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
    })

    it("task status should be not done after creation", () => {
        cy.get('td').find('input[type="checkbox"]').as('checkbox').should('not.be.checked')
    })

    it("task status should change after clicking checkbox", () => {
        cy.get('td').find('input[type="checkbox"]').as('checkbox').should('not.be.checked')
        cy.get('@checkbox').click({ force: true })
        cy.get('td').find('input[type="checkbox"]').as('checkbox').should('be.checked')
    })

    it("Delete selected button should be enabled after checking task", () => {
        cy.contains('button', 'Delete selected').should('not.be.enabled')
        cy.get('td').find('input[type="checkbox"]').as('checkbox').should('not.be.checked')
        cy.get('@checkbox').click({ force: true })
        cy.contains('button', 'Delete selected').should('be.enabled')
    })
})

describe("Task Modal - delete task", () => {
    const taskData = {
        name: 'Task name',
        desc: 'Task desc'
    }

    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()
        cy.contains('button', 'Add').click()
        cy.getByTestId('add-task-modal').as("modal").should('be.visible')
        cy.get("@modal").find('input[name="task-title"]').type(taskData.name)
        cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc)
        cy.get("@modal").contains("button", "Add").click()
        cy.get("@modal").should("not.exist")
        cy.contains('td', taskData.name).should('be.visible')
    })

    it("delete task", () => {
        cy.contains('td', taskData.name).should('be.visible')
        cy.getByTestId('task-dropdown-trigger').as('task-action-trigger').should('be.visible')
        cy.get("@task-action-trigger").click()
        cy.getByTestId("task-dropdown-menu").as('task-dropdown-content').should('be.visible')
        cy.get('@task-dropdown-content').contains('Delete').click()
        cy.contains('td', taskData.name).should('not.exist')
    })
})

describe("Task Modal - delete selected tasks", () => {
    const taskData = {
        name: 'Task name',
        desc: 'Task desc'
    }

    beforeEach(() => {
        cy.gotoMainPage()
        const taskLink = cy.get('li').contains('Tasks')
        taskLink.should('exist')
        taskLink.click()

        for (let i = 0; i < 2; i++) {
            cy.contains('button', 'Add').click()
            cy.getByTestId('add-task-modal').as("modal").should('be.visible')
            cy.get("@modal").find('input[name="task-title"]').type(taskData.name + i)
            cy.get("@modal").find('textarea[name="task-desc"]').type(taskData.desc + i)
            cy.get("@modal").contains("button", "Add").click()
            cy.get("@modal").should("not.exist")
            cy.contains('td', taskData.name + i).should('be.visible')
            cy.wait(200)
        }
    })

    it("Delete selected button should delete only selected tasks", () => {
        cy.getByTestId(taskData.name + 0).should("exist").should('be.visible')
        cy.getByTestId(taskData.name + 1).should("exist").should('be.visible')

        cy.getByTestId(taskData.name + 0)
            .within(() => {
                cy.get('input[type="checkbox"]')
                    .as('checkbox')
                    .should('not.be.checked')
            })

        cy.getByTestId(taskData.name + 1)
            .within(() => {
                cy.get('input[type="checkbox"]')
                    .should('not.be.checked')
            })

        cy.contains('button', 'Delete selected').should('not.be.enabled')
        cy.get('@checkbox').click({ force: true })
        cy.contains('button', 'Delete selected').should('be.enabled').click()
        cy.contains('td', taskData.name + 0).should('not.exist')
        cy.contains('td', taskData.name + 1).should('exist').should('be.visible')
    })
})