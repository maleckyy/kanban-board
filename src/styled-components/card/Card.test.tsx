import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';


describe('Card component', () => {
    it('render with correct text', () => {
        render(<Card>Title</Card>);
        expect(screen.getByText('Title')).toBeInTheDocument();
    });
});