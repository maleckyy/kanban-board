import { styled } from 'styled-components'

const Card = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    flex: 1;
    border: 1px solid var(--border-color-secondary);
    background-color: var(--background-color-primary);
    border-radius: var(--radius-xl);
    padding: 1.25rem 1rem; 
`

export default Card