import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';
import { describe, it, expect} from 'vitest'
import '@testing-library/jest-dom';

describe('Counter Component', () => {
    it('rendering the component should start with initial state', () => {
        render(<Counter/>);

        const heading = screen.getByText(/Count: 0/i);
        expect(heading).toBeInTheDocument();

        const incrementButton = screen.getByText(/Increment count/i)
        const decrementButton = screen.getByText(/Decrement count/i)

        expect(incrementButton).toBeInTheDocument();
        expect(decrementButton).toBeInTheDocument();
    });

    it('should increment the count when increment button is pressed', () => {
        render(<Counter/>)

        const incrementButton = screen.getByText(/Increment count/i);
        const heading = screen.getByText(/Count: 0/i);
    
        fireEvent.click(incrementButton);
        expect(heading).toHaveTextContent('Count: 1');
    });

    it('should decrement the count when decrement button is pressed', () => {
        render(<Counter/>)

        const decrementButton = screen.getByText(/Decrement count/i);
        const heading = screen.getByText(/Count: 0/i);

        fireEvent.click(decrementButton);
        expect(heading).toHaveTextContent('Count: -1');
    });

    it('should increment and then decrement the count', () => {
        render(<Counter />);
        
        const incrementButton = screen.getByText(/Increment count/i);
        const decrementButton = screen.getByText(/Decrement count/i);
        const heading = screen.getByText(/Count: 0/i);
    
        fireEvent.click(incrementButton);
        expect(heading).toHaveTextContent('Count: 1');
    
        fireEvent.click(decrementButton);
        expect(heading).toHaveTextContent('Count: 0');
      });
})