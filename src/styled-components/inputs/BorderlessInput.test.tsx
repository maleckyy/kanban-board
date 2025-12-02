import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BorderlessInput from './BorderlessInput';

describe('BorderlessInput component', () => {
    it('renders with correct label', () => {
        render(<BorderlessInput placeholder='placeholder' />);
        expect(screen.getByPlaceholderText('placeholder')).toBeInTheDocument();
    });

    it('handles input changes correctly', () => {
        const handleChange = vi.fn();
        render(<BorderlessInput onChange={handleChange} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test value' } });

        expect(handleChange).toHaveBeenCalled();
        expect(input).toHaveValue('test value');
    });
});
