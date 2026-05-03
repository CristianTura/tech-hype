import { render, screen } from '@testing-library/react'
import VideoCard from '../VideoCard'
import type { Video } from '../../types/video.types'

const mockVideo: Video = {
  title: 'Advanced React Patterns Tutorial',
  author: 'React Expert',
  thumbnail: 'https://example.com/react-thumb.jpg',
  publishedAt: '2024-02-20',
  hype: 3.123
}

describe('VideoCard', () => {
  it('displays video information', () => {
    render(<VideoCard video={mockVideo} />)
    
    expect(screen.getByText('Advanced React Patterns Tutorial')).toBeInTheDocument()
    expect(screen.getByText('React Expert')).toBeInTheDocument()
    expect(screen.getByText('2024-02-20')).toBeInTheDocument()
  })

  it('displays video image with correct attributes', () => {
    render(<VideoCard video={mockVideo} />)
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', 'https://example.com/react-thumb.jpg')
    expect(image).toHaveAttribute('alt', 'Advanced React Patterns Tutorial')
    expect(image).toHaveAttribute('loading', 'lazy')
  })

  it('displays HypeBadge with correct value', () => {
    render(<VideoCard video={mockVideo} />)
    
    const hypeBadge = screen.getByTitle('Hype: 3.123')
    expect(hypeBadge).toBeInTheDocument()
    expect(hypeBadge).toHaveTextContent('Hype 3.123')
  })
})
