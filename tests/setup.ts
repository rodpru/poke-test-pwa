import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localforage
vi.mock('localforage', () => ({
  default: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));
