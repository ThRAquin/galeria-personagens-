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
