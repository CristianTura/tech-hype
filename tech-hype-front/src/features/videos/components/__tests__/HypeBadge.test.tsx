import { render, screen } from '@testing-library/react'
import HypeBadge from '../HypeBadge'

describe('HypeBadge', () => {
  it('displays hype with correct format', () => {
    render(<HypeBadge hype={1.234} />)
    
    const badge = screen.getByTitle('Hype: 1.234')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveTextContent('Hype 1.234')
  })

  it('handles finite values correctly', () => {
    render(<HypeBadge hype={0.567} />)
    
    expect(screen.getByText('Hype 0.567')).toBeInTheDocument()
  })

  it('displays 0 for non-finite values', () => {
    render(<HypeBadge hype={NaN} />)
    
    expect(screen.getByText('Hype 0.000')).toBeInTheDocument()
  })

  it('displays 0 for infinite values', () => {
    render(<HypeBadge hype={Infinity} />)
    
    expect(screen.getByText('Hype 0.000')).toBeInTheDocument()
  })

  it('applies custom classes', () => {
    render(<HypeBadge hype={1.5} className="custom-class" />)
    
    const badge = screen.getByTitle('Hype: 1.500')
    expect(badge).toHaveClass('custom-class')
  })

  it('prevents text wrapping to multiple lines', () => {
    render(<HypeBadge hype={1.234} />)
    
    const badge = screen.getByTitle('Hype: 1.234')
    expect(badge).toHaveClass('whitespace-nowrap')
  })
})
