import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageTitle from './PageTitle';

describe('PageTitle component', () => {
    it('render with correct text', () => {
        render(<PageTitle>Title</PageTitle>);
        expect(screen.getByText('Title')).toBeInTheDocument();
    });
});