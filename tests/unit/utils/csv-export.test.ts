import { describe, it, expect, vi } from 'vitest';
import { generateCSV, downloadCSV } from '@/lib/utils/csv-export';
import { CaughtPokemon } from '@/lib/types/pokedex.types';

// Mock data
const mockCaughtPokemon: CaughtPokemon[] = [
  {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    height: 40,
    weight: 60,
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      specialAttack: 50,
      specialDefense: 50,
      speed: 90,
    },
    caughtAt: '2024-01-15T10:30:00Z',
    note: 'My first!',
    sprite: 'https://example.com/pikachu.png',
  },
  {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    height: 70,
    weight: 69,
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      specialAttack: 65,
      specialDefense: 65,
      speed: 45,
    },
    caughtAt: '2024-01-20T14:20:00Z',
    note: '',
    sprite: 'https://example.com/bulbasaur.png',
  },
];

describe('generateCSV', () => {
  it('generates CSV with correct headers', () => {
    const csv = generateCSV([]);
    const headers = csv.split('\n')[0];
    expect(headers).toContain('ID');
    expect(headers).toContain('Name');
    expect(headers).toContain('Type 1');
    expect(headers).toContain('Caught Date');
  });

  it('generates CSV with pokemon data', () => {
    const csv = generateCSV(mockCaughtPokemon);
    const lines = csv.split('\n');
    
    expect(lines).toHaveLength(3); // header + 2 pokemon
    expect(lines[1]).toContain('pikachu');
    expect(lines[1]).toContain('25');
    expect(lines[1]).toContain('electric');
    expect(lines[2]).toContain('bulbasaur');
    expect(lines[2]).toContain('grass');
    expect(lines[2]).toContain('poison');
  });

  it('handles empty note field', () => {
    const csv = generateCSV([mockCaughtPokemon[1]]);
    const row = csv.split('\n')[1];
    expect(row).toContain('bulbasaur');
  });

  it('handles special characters in names', () => {
    const pokemonWithComma: CaughtPokemon = {
      ...mockCaughtPokemon[0],
      name: 'mr, mime',
      note: 'Has a "special" note',
    };
    const csv = generateCSV([pokemonWithComma]);
    expect(csv).toContain('"mr, mime"');
    expect(csv).toContain('"Has a ""special"" note"');
  });

  it('handles newlines in notes', () => {
    const pokemonWithNewline: CaughtPokemon = {
      ...mockCaughtPokemon[0],
      note: 'Line 1\nLine 2',
    };
    const csv = generateCSV([pokemonWithNewline]);
    expect(csv).toContain('"Line 1\nLine 2"');
  });

  it('formats height and weight correctly', () => {
    const csv = generateCSV(mockCaughtPokemon);
    const pikachuRow = csv.split('\n')[1];
    expect(pikachuRow).toContain('4'); // 40/10 = 4m
    expect(pikachuRow).toContain('6'); // 60/10 = 6kg
  });

  it('returns empty CSV with only headers for empty list', () => {
    const csv = generateCSV([]);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain('ID');
  });
});

describe('downloadCSV', () => {
  it('creates download link and triggers click', () => {
    // Mock document methods
    const mockLink = {
      setAttribute: vi.fn(),
      style: { visibility: '' },
      click: vi.fn(),
    };
    
    const mockCreateElement = vi.fn().mockReturnValue(mockLink);
    const mockAppendChild = vi.fn();
    const mockRemoveChild = vi.fn();
    
    // @ts-ignore
    global.document.createElement = mockCreateElement;
    global.document.body.appendChild = mockAppendChild;
    global.document.body.removeChild = mockRemoveChild;
    
    // @ts-ignore
    global.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');

    downloadCSV('mock-content', 'test.csv');

    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('href', 'blob:mock-url');
    expect(mockLink.setAttribute).toHaveBeenCalledWith('download', 'test.csv');
    expect(mockLink.click).toHaveBeenCalled();
  });
});
