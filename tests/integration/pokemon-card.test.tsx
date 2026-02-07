import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PokemonCard } from '@/components/pokemon/pokemon-card';
import { Pokemon } from '@/lib/types';

// Mock hooks
vi.mock('@/lib/hooks', () => ({
  useToggleCatch: vi.fn(),
}));

vi.mock('@/components/ui/toast', () => ({
  useToast: vi.fn(),
}));

// Mock Next.js Link and Image
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));

import { useToggleCatch } from '@/lib/hooks';
import { useToast } from '@/components/ui/toast';

describe('PokemonCard', () => {
  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    types: [{ slot: 1, type: { name: 'electric', url: '' } }],
    height: 4,
    weight: 60,
    stats: [],
    sprites: {
      front_default: 'sprite.png',
      other: {
        'official-artwork': {
          front_default: 'official-artwork.png',
        },
      },
    },
  };

  const mockToggle = vi.fn();
  const mockAddToast = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useToggleCatch).mockReturnValue({
      caught: false,
      toggle: mockToggle,
    });
    vi.mocked(useToast).mockReturnValue({
      addToast: mockAddToast,
      removeToast: vi.fn(),
      toasts: [],
    });
  });

  it('renders Pokemon card correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('Capturar')).toBeInTheDocument();
  });

  it('shows caught badge when Pokemon is caught', () => {
    vi.mocked(useToggleCatch).mockReturnValue({
      caught: true,
      toggle: mockToggle,
    });

    render(<PokemonCard pokemon={mockPokemon} />);

    expect(screen.getByText('Capturado')).toBeInTheDocument();
  });

  it('calls toggle when catch button is clicked', () => {
    render(<PokemonCard pokemon={mockPokemon} />);

    const button = screen.getByText('Capturar');
    fireEvent.click(button);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it('shows success toast when capturing', () => {
    vi.mocked(useToggleCatch).mockReturnValue({
      caught: false,
      toggle: mockToggle,
    });

    render(<PokemonCard pokemon={mockPokemon} />);

    const button = screen.getByText('Capturar');
    fireEvent.click(button);

    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Pokémon Capturado!',
        variant: 'success',
      })
    );
  });

  it('shows info toast when releasing', () => {
    vi.mocked(useToggleCatch).mockReturnValue({
      caught: true,
      toggle: mockToggle,
    });

    render(<PokemonCard pokemon={mockPokemon} />);

    const button = screen.getByText('Capturado');
    fireEvent.click(button);

    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Pokémon Libertado',
        variant: 'info',
      })
    );
  });

  it('renders in selection mode', () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isSelectionMode={true}
        isSelected={false}
        onSelect={mockToggle}
      />
    );

    // Should show checkbox in selection mode
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onSelect when clicked in selection mode', () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        isSelectionMode={true}
        isSelected={false}
        onSelect={mockToggle}
      />
    );

    const card = screen.getByText('pikachu').closest('div[class*="Card"]') || 
                 screen.getByText('pikachu').closest('div');
    if (card) {
      fireEvent.click(card);
      expect(mockToggle).toHaveBeenCalled();
    }
  });
});
