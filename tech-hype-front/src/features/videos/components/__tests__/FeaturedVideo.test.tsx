import { render, screen } from '@testing-library/react'
import FeaturedVideo from '../FeaturedVideo'
import type { Video } from '../../types/video.types'

const mockVideo: Video = {
  title: 'Amazing Tech Video',
  author: 'Tech Creator',
  thumbnail: 'https://example.com/thumb.jpg',
  publishedAt: '2024-01-15',
  hype: 2.567
}

describe('FeaturedVideo', () => {
  it('displays "Most Hyped Video!" title', () => {
    render(<FeaturedVideo video={mockVideo} />)
    
    expect(screen.getByText('Most Hyped Video!')).toBeInTheDocument()
  })

  it('displays video information', () => {
    render(<FeaturedVideo video={mockVideo} />)
    
    expect(screen.getByText('Amazing Tech Video')).toBeInTheDocument()
    expect(screen.getByText('Tech Creator')).toBeInTheDocument()
    expect(screen.getByText('2024-01-15')).toBeInTheDocument()
  })

  it('displays "Crown Jewel" badge', () => {
    render(<FeaturedVideo video={mockVideo} />)
    
    expect(screen.getByText('👑')).toBeInTheDocument()
    expect(screen.getByText('Crown Jewel')).toBeInTheDocument()
  })

  it('displays HypeBadge with correct value', () => {
    render(<FeaturedVideo video={mockVideo} />)
    
    const hypeBadge = screen.getByTitle('Hype: 2.567')
    expect(hypeBadge).toBeInTheDocument()
    expect(hypeBadge).toHaveTextContent('Hype 2.567')
  })
})
