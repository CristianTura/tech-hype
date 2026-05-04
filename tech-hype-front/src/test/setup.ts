import '@testing-library/jest-dom'

// Mock de IntersectionObserver para tests
Object.defineProperty(globalThis, 'IntersectionObserver', {
  value: class {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
  writable: true
})

// Mock de ResizeObserver para tests
Object.defineProperty(globalThis, 'ResizeObserver', {
  value: class {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  },
  writable: true
})
