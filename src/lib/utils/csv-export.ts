import { CaughtPokemon } from '@/lib/types/pokedex.types';

export function generateCSV(pokemonList: CaughtPokemon[]): string {
  const headers = [
    'ID',
    'Name',
    'Type 1',
    'Type 2',
    'Height (m)',
    'Weight (kg)',
    'HP',
    'Attack',
    'Defense',
    'Sp. Atk',
    'Sp. Def',
    'Speed',
    'Caught Date',
    'Note'
  ];

  const rows = pokemonList.map((p) => {
    const type1 = p.types[0] || '';
    const type2 = p.types[1] || '';
    
    // Format values to avoid CSV issues
    const escapeCsv = (val: string | number | undefined) => {
      if (val === undefined || val === null) return '';
      const str = String(val);
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    return [
      p.id,
      escapeCsv(p.name),
      escapeCsv(type1),
      escapeCsv(type2),
      p.height / 10,
      p.weight / 10,
      p.stats.hp,
      p.stats.attack,
      p.stats.defense,
      p.stats.specialAttack,
      p.stats.specialDefense,
      p.stats.speed,
      p.caughtAt,
      escapeCsv(p.note)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
