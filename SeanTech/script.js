// Variáveis globais
let livros = [
    { titulo: "Dom Quixote", autor: "Miguel de Cervantes", imagem: "OIP (1).jpg" },
    { titulo: "Diário de Anne Frank", autor: "Anne Frank", imagem: "large.jpg" },
    { titulo: "Harry Potter e o Cálice de Fogo", autor: "J.K. Rowling", imagem: "D_NQ_NP_835042-MLB44754843826_012021-F.jpg" },
    { titulo: "Lupin", autor: "Maurício", imagem: "R.jpg" },
    { titulo: "A Revolução dos Bichos", autor: "George Orwell", imagem: "a-revolucao-dos-bichos.jpg" },
    { titulo: "1984", autor: "George Orwell", imagem: "OIP.jpg" },
    { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", imagem: "p.jpg" },
    { titulo: "A Guerra dos Tronos", autor: "George R.R. Martin", imagem: "das.jpg" },
    { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", imagem: "senhor-dos-aneis-colume-unico-amazon.jpg" },
    { titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", imagem: "R (1)ddd.jpg" },
    { titulo: "A Divina Comédia", autor: "Dante Alighieri", imagem: "37039854583_c0fe912932_b.jpg" },
    
    { titulo: "O Morro dos Ventos Uivantes", autor: "Emily Brontë", imagem: "asd.jpg" },
    { titulo: "Frankenstein", autor: "Mary Shelley", imagem: "y.jpg" },
    { titulo: "Moby Dick", autor: "Herman Melville", imagem: "i.jpg" },
    { titulo: "O Apanhador no Campo de Centeio", autor: "J.D. Salinger", imagem: "o.jpg" }
];

let reservas = [];

// Carregar reservas do armazenamento local
function carregarReservas() {
    const reservasSalvas = localStorage.getItem('reservas');
    if (reservasSalvas) {
        reservas = JSON.parse(reservasSalvas);
        atualizarListaReservas();
    }
}

// Função para pesquisar livros
function pesquisarLivros() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const livrosDiv = document.querySelector('.livros');
    livrosDiv.innerHTML = '';

    livros.forEach(livro => {
        if (livro.titulo.toLowerCase().includes(input) || livro.autor.toLowerCase().includes(input)) {
            livrosDiv.innerHTML += `
                <div class="livro" onclick="abrirModal('${livro.titulo}', '${livro.autor}', '${livro.imagem}')" tabindex="0" role="button" aria-label="Abrir detalhes de ${livro.titulo}">
                    <img src="${livro.imagem}" alt="Capa do livro ${livro.titulo}">
                    <h3>${livro.titulo}</h3>
                    <p>Autor: ${livro.autor}</p>
                </div>
            `;
        }
    });
}

// Função para abrir o modal com detalhes do livro
function abrirModal(titulo, autor, imagem) {
    document.getElementById('modal-titulo').innerText = titulo;
    document.getElementById('modal-autor').innerText = autor;
    document.getElementById('modal-img').src = imagem;
    document.getElementById('modal').style.display = 'block';
}

// Função para fechar o modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}

// Função para avaliar o livro
function avaliar(estrelas) {
    const resultado = document.getElementById('resultado-avaliacao');
    resultado.innerText = `Você avaliou com ${estrelas} estrela(s).`;
    
    // Salvar avaliação em localStorage
    const avaliacoes = JSON.parse(localStorage.getItem('avaliacoes')) || {};
    avaliacoes[document.getElementById('modal-titulo').innerText] = estrelas;
    localStorage.setItem('avaliacoes', JSON.stringify(avaliacoes));

    // Mensagem de confirmação
    alert(`Avaliação de ${estrelas} estrela(s) salva com sucesso!`);
}

// Função para abrir o formulário de reserva
function abrirFormularioReserva() {
    document.getElementById('modal-reserva').style.display = 'block';
}

// Função para fechar o formulário de reserva
function fecharFormularioReserva() {
    document.getElementById('modal-reserva').style.display = 'none';
}

// Função para salvar a reserva
function salvarReserva(event) {
    event.preventDefault();
    const nomeAluno = document.getElementById('nomeAluno').value;
    const tempoReserva = document.getElementById('tempoReserva').value;
    const telefone = document.getElementById('telefone').value;

    const reserva = { nomeAluno, tempoReserva, telefone };
    reservas.push(reserva);
    
    // Salvar reservas no localStorage
    localStorage.setItem('reservas', JSON.stringify(reservas));
    
    alert(`Reserva confirmada para ${nomeAluno} por ${tempoReserva} dias.`);
    fecharFormularioReserva();
    
    // Limpa o formulário
    document.getElementById('formReserva').reset();
    atualizarListaReservas();
}

// Função para atualizar a lista de reservas
function atualizarListaReservas() {
    const reservasLista = document.getElementById('reservas-lista');
    reservasLista.innerHTML = '';
    
    reservas.forEach((reserva, index) => {
        reservasLista.innerHTML += `
            <div class="reserva">
                <p><strong>Nome:</strong> ${reserva.nomeAluno}</p>
                <p><strong>Tempo de Reserva:</strong> ${reserva.tempoReserva} dias</p>
                <p><strong>Telefone:</strong> ${reserva.telefone}</p>
                <button onclick="removerReserva(${index})">Remover Reserva</button>
            </div>
        `;
    });
}

// Função para remover uma reserva
function removerReserva(index) {
    reservas.splice(index, 1);
    localStorage.setItem('reservas', JSON.stringify(reservas));
    atualizarListaReservas();
}

// Inicializa a lista de livros na página e carrega reservas
document.addEventListener("DOMContentLoaded", () => {
    carregarReservas();
    pesquisarLivros();
});
