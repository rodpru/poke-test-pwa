import { describe, it, expect } from 'vitest';
import {
  formatHeight,
  formatWeight,
  formatPokemonId,
  capitalize,
  formatDate,
  formatDateTime,
} from '@/lib/utils/formatters';

describe('formatHeight', () => {
  it('formats height correctly', () => {
    expect(formatHeight(70)).toBe('7m');
    expect(formatHeight(45)).toBe('4.5m');
    expect(formatHeight(6)).toBe('0.6m');
    expect(formatHeight(0)).toBe('0m');
  });
});

describe('formatWeight', () => {
  it('formats weight correctly', () => {
    expect(formatWeight(69)).toBe('6.9kg');
    expect(formatWeight(905)).toBe('90.5kg');
    expect(formatWeight(10)).toBe('1kg');
    expect(formatWeight(0)).toBe('0kg');
  });
});

describe('formatPokemonId', () => {
  it('formats Pokemon ID with padding', () => {
    expect(formatPokemonId(1)).toBe('#001');
    expect(formatPokemonId(25)).toBe('#025');
    expect(formatPokemonId(150)).toBe('#150');
    expect(formatPokemonId(1000)).toBe('#1000');
  });
});

describe('capitalize', () => {
  it('capitalizes first letter', () => {
    expect(capitalize('pikachu')).toBe('Pikachu');
    expect(capitalize('bulbasaur')).toBe('Bulbasaur');
    expect(capitalize('PIKACHU')).toBe('PIKACHU');
    expect(capitalize('')).toBe('');
    expect(capitalize('a')).toBe('A');
  });
});

describe('formatDate', () => {
  it('formats date to Brazilian format', () => {
    expect(formatDate('2024-01-15')).toBe('15/01/2024');
    expect(formatDate('2023-12-25T10:30:00Z')).toBe('25/12/2023');
  });
});

describe('formatDateTime', () => {
  it('formats date and time to Brazilian format', () => {
    const result = formatDateTime('2024-01-15T10:30:00');
    expect(result).toContain('15/01/2024');
    expect(result).toContain('10:30');
  });
});
