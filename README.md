# 🎯 Pokédex PWA

Aplicação web progressiva (PWA) para gestão de coleção de Pokémon. Capture, organize e analise seus Pokémon favoritos, mesmo offline!

![Pokédex PWA](public/icons/icon-192.png)

## ✨ Funcionalidades

- 📱 **Lista Completa de Pokémon** - Visualize todos os 1000+ Pokémon com imagens oficiais
- 🔍 **Filtros e Ordenação** - Pesquise por nome, filtre por tipo e ordene por diversos critérios
- 📊 **Modos de Visualização** - Alterne entre visualização em grid ou tabela
- 💾 **Gestão de Pokédex Pessoal** - Capture e gerencie seus Pokémon favoritos
- 📝 **Notas Personalizadas** - Adicione notas aos Pokémon capturados
- 📤 **Exportação CSV** - Exporte sua coleção para CSV
- 📈 **Dashboard Analytics** - Visualize estatísticas do seu progresso
- 🔗 **Partilha** - Compartilhe Pokémon com amigos via Web Share API
- 📴 **Funciona Offline** - Acesse todos os dados mesmo sem internet
- 🏠 **Instalável** - Adicione à tela inicial como app nativo

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| [Next.js](https://nextjs.org/) | 14.x | Framework React com App Router |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [React Query](https://tanstack.com/query/latest) | 5.x | Data fetching + cache cliente |
| [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction) | 4.x | State management |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Styling |
| [next-pwa](https://github.com/DuCanhGH/next-pwa) | 5.x | PWA capabilities |
| [IndexedDB (localforage)](https://localforage.github.io/localForage/) | 1.x | Persistent storage offline |
| [Vitest](https://vitest.dev/) | 1.x | Unit & integration testing |
| [Lucide React](https://lucide.dev/) | - | Icons |
| [PokéAPI](https://pokeapi.co/) | - | Fonte de dados dos Pokémon |

## 🚀 Getting Started

### Pré-requisitos

- Node.js 18.x ou superior
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd pokedex-pwa
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente (opcional):
```bash
cp .env.example .env.local
```

### Desenvolvimento

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
```

O build será gerado na pasta `.next/`.

### Servir em Produção (local)

```bash
npm start
```

### Testes

Execute os testes unitários:

```bash
npm test
```

Execute com coverage:

```bash
npm run test:coverage
```

## 📱 Funcionalidades PWA

### Instalar no Dispositivo

#### Android (Chrome):
1. Abra a aplicação no Chrome
2. Toque no menu (⋮)
3. Selecione "Adicionar à tela inicial"

#### iOS (Safari):
1. Abra a aplicação no Safari
2. Toque no botão de partilha
3. Selecione "Adicionar à Tela de Início"

#### Desktop (Chrome/Edge):
1. Abra a aplicação
2. Clique no ícone de instalação na barra de endereço
3. Siga as instruções

### Funcionamento Offline

A aplicação funciona completamente offline graças a:

- **Service Worker** - Cache de API e imagens
- **IndexedDB** - Persistência da sua Pokédex pessoal
- **React Query** - Cache de dados em memória

## 🗂️ Estrutura do Projeto

```
pokedex-pwa/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # Home - Lista de Pokémon
│   │   ├── layout.tsx         # Root layout
│   │   ├── providers.tsx      # React Query provider
│   │   ├── pokemon/
│   │   │   └── [id]/
│   │   │       └── page.tsx   # Detalhes do Pokémon
│   │   ├── pokedex/
│   │   │   └── page.tsx       # Minha Pokédex
│   │   └── analytics/
│   │       └── page.tsx       # Dashboard
│   ├── components/
│   │   ├── pokemon/           # Componentes de Pokémon
│   │   ├── filters/           # Componentes de filtro
│   │   ├── pokedex/           # Componentes da Pokédex
│   │   ├── ui/                # Componentes base (shadcn/ui)
│   │   └── shared/            # Componentes compartilhados
│   └── lib/
│       ├── services/          # API calls
│       ├── stores/            # Zustand stores
│       ├── hooks/             # Custom React hooks
│       ├── utils/             # Utilitários
│       └── types/             # TypeScript types
├── public/                    # Assets estáticos
│   ├── icons/                 # PWA icons
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service Worker
└── tests/                     # Testes
    ├── unit/
    └── integration/
```

## 🎯 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm start` | Inicia servidor de produção |
| `npm test` | Executa testes |
| `npm run test:coverage` | Executa testes com coverage |
| `npm run lint` | Executa ESLint |

## 🔧 Troubleshooting

### Erro de Hydration
Se aparecer erros de hydration no console (ex: `cz-shortcut-listen`), é provavelmente causado por extensões do Chrome (ColorZilla, etc.). A aplicação já inclui tratamento para isso via `suppressHydrationWarning` e `ChromeExtensionCleanup`.

### Build falha
Verifique se todas as dependências estão instaladas:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Testes falham
Verifique se o ambiente está configurado corretamente:
```bash
npm test -- --run
```

## 📸 Screenshots

> *Adicione screenshots da aplicação aqui*

### Desktop
- Home com lista de Pokémon
- Página de detalhes
- Dashboard Analytics

### Mobile
- Visualização em grid
- Filtros e busca
- Pokédex pessoal

## 🌐 Demo

> *Adicione o link do deploy aqui (Vercel, Netlify, etc.)*
> 
> Exemplo: `https://pokedex-pwa.vercel.app`

## 🔄 APIs Utilizadas

### PokéAPI
- `GET /pokemon?limit=1000` - Lista completa
- `GET /pokemon/{id}` - Detalhes individuais
- `GET /type/{type}` - Filtrar por tipo

### Imagens
- Sprites oficiais: `https://raw.githubusercontent.com/PokeAPI/sprites/...`

## 📈 Performance & Quality

- 🟠 Lighthouse Performance: 65
- 🟢 Lighthouse Accessibility: 85
- 🟠 Lighthouse Best Practices: 77
- 🟢 Lighthouse SEO: 100
- ✅ Test Coverage: 96%
- ✅ TypeScript Strict Mode

### Fases Implementadas
- ✅ **Fase 1**: Setup & Fundação (Next.js, TypeScript, Tailwind, PWA)
- ✅ **Fase 2**: Core Features - Listagem (Grid/Table, API integration)
- ✅ **Fase 3**: Pokédex Management (Zustand + IndexedDB)
- ✅ **Fase 4**: Detalhes & Navegação (Stats, Notas, Partilha)
- ✅ **Fase 5**: Filtros & Ordenação (Busca, Tipos, Sort)
- ✅ **Fase 6**: Features Avançadas (Bulk actions, Export CSV, Analytics)
- ✅ **Fase 7**: PWA & Offline (Service Worker, Cache, Offline indicator)
- ✅ **Fase 8**: Testes & Qualidade (Vitest, 60 testes, 96% coverage)

## 🧪 Testes

O projeto possui **60 testes** com **96% de coverage**:

```bash
# Executar todos os testes
npm test

# Executar com relatório de cobertura
npm run test:coverage
```

### Coverage Report
```
✅ Statements:  95.65%
✅ Branches:    91.22%
✅ Functions:   97.05%
✅ Lines:       96.03%
```

### Tipos de Testes
- **Unit Tests** - Utilitários (`formatters`, `filters`, `csv-export`) e serviços (`pokemon.service`)
- **Integration Tests** - Componentes (`pokemon-card`) com React Testing Library
- **Mocks** - LocalForage (IndexedDB) e fetch API

## 🤝 Contribuir

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 🙏 Agradecimentos

- [PokéAPI](https://pokeapi.co/) por fornecer os dados dos Pokémon
- [Pokémon](https://www.pokemon.com/) por criar esta franquia incrível

---

<p align="center">
  Feito com ❤️ para fãs de Pokémon
</p>
