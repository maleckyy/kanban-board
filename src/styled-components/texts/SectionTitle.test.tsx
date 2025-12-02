import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SectionTitle from './SectionTitle';

describe('SectionTitle component', () => {
    it('render with correct text', () => {
        render(<SectionTitle>Title</SectionTitle>);
        expect(screen.getByText('Title')).toBeInTheDocument();
    });
});