import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FiltersBar from '@/features/videos/components/FiltersBar'
import type { IVideosFiltersState } from '@/features/videos/types/video.types'

const mockValue: IVideosFiltersState = {
  author: 'Test Author',
  minHype: '1.5',
  sortBy: 'hype',
  order: 'desc'
}

const mockOnChange = vi.fn()
const mockOnReset = vi.fn()

describe('FiltersBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays all fields with their values', () => {
    render(<FiltersBar value={mockValue} onChange={mockOnChange} />)
    
    expect(screen.getByDisplayValue('Test Author')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1.5')).toBeInTheDocument()
    expect(screen.getByDisplayValue('hype')).toBeInTheDocument()
    expect(screen.getByDisplayValue('desc')).toBeInTheDocument()
  })

  it('calls onChange when author is modified', async () => {
    const user = userEvent.setup()
    render(<FiltersBar value={mockValue} onChange={mockOnChange} />)
    
    const authorInput = screen.getByDisplayValue('Test Author')
    await user.type(authorInput, 'X')
    
    expect(mockOnChange).toHaveBeenCalled()
    // Verify that it includes the new character
    const lastCall = mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1][0]
    expect(lastCall.author).toContain('X')
  })

  it('calls onChange when sortBy is changed', async () => {
    render(<FiltersBar value={mockValue} onChange={mockOnChange} />)
    
    const sortBySelect = screen.getByDisplayValue('hype')
    fireEvent.change(sortBySelect, { target: { value: 'date' } })
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValue,
      sortBy: 'date'
    })
  })

  it('calls onChange when order is changed', async () => {
    render(<FiltersBar value={mockValue} onChange={mockOnChange} />)
    
    const orderSelect = screen.getByDisplayValue('desc')
    fireEvent.change(orderSelect, { target: { value: 'asc' } })
    
    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockValue,
      order: 'asc'
    })
  })

  it('displays reset button when onReset is provided', () => {
    render(<FiltersBar value={mockValue} onChange={mockOnChange} onReset={mockOnReset} />)
    
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<FiltersBar value={mockValue} onChange={mockOnChange} onReset={mockOnReset} />)
    
    const resetButton = screen.getByRole('button', { name: 'Reset' })
    await user.click(resetButton)
    
    expect(mockOnReset).toHaveBeenCalledTimes(1)
  })

  it('minHype input has correct attributes', () => {
    render(<FiltersBar value={mockValue} onChange={mockOnChange} />)
    
    const minHypeInput = screen.getByDisplayValue('1.5')
    expect(minHypeInput).toHaveAttribute('type', 'number')
    expect(minHypeInput).toHaveAttribute('min', '0')
    expect(minHypeInput).toHaveAttribute('step', '0.01')
  })
})
