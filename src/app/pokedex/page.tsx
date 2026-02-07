export default function PokedexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Minha Pokédex</h1>
      <p className="mt-2 text-gray-600">
        Gerencie seus Pokémon capturados
      </p>
      <div className="mt-8 p-12 bg-white rounded-lg shadow text-center">
        <p className="text-gray-500">Nenhum Pokémon capturado ainda.</p>
        <p className="text-sm text-gray-400 mt-2">
          Vá para a Home e capture seus primeiros Pokémon!
        </p>
      </div>
    </div>
  );
}
