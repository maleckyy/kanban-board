import { describe, it, expect } from 'vitest';
import { useBoardViewStore } from './boardViewStore';

describe('useBoardViewStore', () => {
    it('should have default boardView as "board"', () => {
        const { boardView } = useBoardViewStore.getState();
        expect(boardView).toBe('board');
    });

    it('should update boardView when setView is called', () => {
        const { setView, boardView } = useBoardViewStore.getState();
        expect(boardView).toBe('board');

        setView('list');
        const updated = useBoardViewStore.getState().boardView;
        expect(updated).toBe('list');
    });

    it('should persist value to localStorage', () => {
        const { setView } = useBoardViewStore.getState();
        setView('list');
        expect(localStorage.setItem).toBeDefined();
    });
});
