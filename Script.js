// Dados Iniciais para o site não abrir vazio
const produtosPadrao = [
    { id: 1, nome: "Taça de Cristal", preco: 85.00, estoque: 10, img: "https://images.unsplash.com/photo-1574930304272-982767e1dfad?q=80&w=400" },
    { id: 2, nome: "Vaso Girassol", preco: 120.00, estoque: 5, img: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=400" }
];

// Inicializar Banco de Dados
let DB = JSON.parse(localStorage.getItem('ArteVidroDB')) || {
    produtos: produtosPadrao,
    pedidos: []
};

function renderizarLoja() {
    const vitrine = document.getElementById('vitrine');
    if(!vitrine) return;

    vitrine.innerHTML = DB.produtos.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}">
            <h3>${p.nome}</h3>
            <p>R$ ${p.preco.toFixed(2)}</p>
            <p><small>Estoque: ${p.estoque}</small></p>
            <button onclick="finalizarCompra('${p.nome}', ${p.preco})">Comprar Agora</button>
        </div>
    `).join('');
}

function finalizarCompra(nome, valor) {
    const idPedido = "AV-" + Math.floor(Math.random() * 1000000);
    
    // Gerar QR Code
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, {
        text: "Pedido: " + idPedido + " | Produto: " + nome,
        width: 150,
        height: 150
    });

    document.getElementById('modal-pedido').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal-pedido').style.display = 'none';
}

// Rodar ao carregar
window.onload = renderizarLoja;
