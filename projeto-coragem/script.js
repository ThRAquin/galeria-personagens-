// URL base da API
const API_URL = 'https://rickandmortyapi.com/api/character';

// Elementos do DOM
const cardsContainer = document.getElementById('cardsContainer');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');

// Função para buscar personagens da API
async function fetchCharacters(url = API_URL) {
    try {
        // Mostrar loading
        loading.style.display = 'block';
        errorMessage.style.display = 'none';
        cardsContainer.innerHTML = '';

        // Fazer requisição à API
        const response = await fetch(url);
        
        // Verificar se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }

        // Converter resposta para JSON
        const data = await response.json();
        
        // Esconder loading
        loading.style.display = 'none';
        
        // Criar cards com os personagens
        createCards(data.results);
        
    } catch (error) {
        console.error('Erro:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}

// Função para criar os cards dinamicamente
function createCards(characters) {
    // Limpar container
    cardsContainer.innerHTML = '';
    
    // Verificar se há personagens
    if (!characters || characters.length === 0) {
        cardsContainer.innerHTML = '<p style="color: white; text-align: center;">Nenhum personagem encontrado.</p>';
        return;
    }
    
    // Criar um card para cada personagem
    characters.forEach(character => {
        // Criar elementos do card
        const card = document.createElement('div');
        card.className = 'card';
        
        const image = document.createElement('img');
        image.src = character.image;
        image.alt = character.name;
        image.className = 'card-image';
        
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content';
        
        const title = document.createElement('h2');
        title.className = 'card-title';
        title.textContent = character.name;
        
        const cardInfo = document.createElement('div');
        cardInfo.className = 'card-info';
        
        // Status do personagem
        const statusItem = document.createElement('div');
        statusItem.className = 'card-info-item';
        
        const statusBadge = document.createElement('span');
        statusBadge.className = `status-badge status-${character.status.toLowerCase()}`;
        statusBadge.textContent = translateStatus(character.status);
        
        statusItem.innerHTML = '<strong>Status:</strong> ';
        statusItem.appendChild(statusBadge);
        
        // Espécie
        const speciesItem = document.createElement('div');
        speciesItem.className = 'card-info-item';
        speciesItem.innerHTML = `<strong>Espécie:</strong> ${character.species}`;
        
        // Origem
        const originItem = document.createElement('div');
        originItem.className = 'card-info-item';
        originItem.innerHTML = `<strong>Origem:</strong> ${character.origin.name}`;
        
        // Montar a estrutura do card
        cardInfo.appendChild(statusItem);
        cardInfo.appendChild(speciesItem);
        cardInfo.appendChild(originItem);
        
        cardContent.appendChild(title);
        cardContent.appendChild(cardInfo);
        
        card.appendChild(image);
        card.appendChild(cardContent);
        
        // Adicionar card ao container
        cardsContainer.appendChild(card);
    });
}

// Função para traduzir status
function translateStatus(status) {
    const translations = {
        'Alive': 'Vivo',
        'Dead': 'Morto',
        'unknown': 'Desconhecido'
    };
    return translations[status] || status;
}

// Função de busca
function searchCharacter() {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        fetchCharacters();
        return;
    }
    
    const searchUrl = `${API_URL}/?name=${searchTerm}`;
    fetchCharacters(searchUrl);
}

// Event Listeners
searchButton.addEventListener('click', searchCharacter);

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCharacter();
    }
});

// Carregar personagens ao iniciar a página
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
});
```

---

### **ETAPA 5: Parte Teórica (PDF)**

#### Passo 5.1: Criar documento explicativo

Crie um documento PDF com o seguinte conteúdo:

**PÁGINA 1: O que é API e Consumo de Dados**
```
1. O QUE É UMA API?

API (Application Programming Interface) é uma interface que permite 
a comunicação entre diferentes sistemas de software. É como um "garçom" 
que leva seu pedido (requisição) para a cozinha (servidor) e traz de 
volta sua comida (resposta com dados).

COMO FUNCIONA O CONSUMO EM TEMPO REAL:
1. O navegador faz uma requisição HTTP para o servidor da API
2. O servidor processa a requisição e busca os dados solicitados
3. Os dados são retornados em formato JSON
4. O JavaScript processa esses dados e atualiza a página dinamicamente

EXEMPLO PRÁTICO:
Quando você abre o site, o JavaScript usa fetch() para pedir os dados
dos personagens. A API responde com um arquivo JSON contendo informações
como nome, imagem e status de cada personagem.
```

**PÁGINA 2: DOM Manipulation e JavaScript**
```
2. DOM MANIPULATION

O DOM (Document Object Model) é a representação em árvore do HTML.
JavaScript pode manipular o DOM para criar, modificar ou remover 
elementos da página dinamicamente.

FUNÇÕES PRINCIPAIS UTILIZADAS:

- fetch(url): Faz requisições HTTP para buscar dados da API
  Retorna uma Promise que resolve com a resposta

- .then(): Processa a resposta da Promise de forma assíncrona

- document.createElement(tag): Cria um novo elemento HTML
  Exemplo: document.createElement('div')

- element.appendChild(child): Adiciona um elemento filho
  Exemplo: card.appendChild(image)

- element.textContent: Define o texto de um elemento

- element.className: Define classes CSS de um elemento

FLUXO DO CÓDIGO:
1. fetch() busca dados da API
2. Resposta é convertida para JSON
3. Loop percorre array de personagens
4. createElement() cria cards dinamicamente
5. appendChild() adiciona cards ao container
```

**PÁGINA 3: API Escolhida e Justificativa**
```
3. API ESCOLHIDA: RICK AND MORTY API

MOTIVO DA ESCOLHA:
- Gratuita e sem necessidade de token/cadastro
- Documentação clara e bem organizada
- Resposta rápida e dados estruturados
- Desenho que marcou a geração atual
- Imagens de alta qualidade
- Estrutura JSON simples e fácil de manipular

REGRAS DE ACESSO:
- URL base: https://rickandmortyapi.com/api/character
- Sem limite de requisições
- Não requer autenticação
- Suporta paginação e filtros por nome

ESTRUTURA DA RESPOSTA JSON:
{
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "image": "url_da_imagem.jpg",
      "origin": { "name": "Earth" }
    }
  ]
}

DOCUMENTAÇÃO: https://rickandmortyapi.com/documentation
