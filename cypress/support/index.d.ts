declare namespace Cypress {
    interface Chainable {
        getByTestId(id: string): Chainable<JQuery<HTMLElement>>;
        gotoMainPage(): Chainable<Window>;
        shouldBeOnPage(path: string): Chainable<void>;
    }
}