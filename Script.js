// Banco de dados com seus produtos e imagens reais
const produtosIniciais = [
    { id: 1, nome: "Vaso Girassol Artesanal Exclusivo", preco: 120.00, img: "img/girasol WhatsApp Image 2025-08-13 at 17.14.00.jpeg" },
    { id: 2, nome: "Jogo Suqueira com 6 Copos", preco: 180.00, img: "img/6 copos suqueira Image 1 de set. de 2025, 13_30_19.png" },
    { id: 3, nome: "Taça de Cristal Única", preco: 85.00, img: "img/taça- Image 28 de set. de 2025, 14_21_19.png" },
    { id: 4, nome: "Pote Decorativo T Sustentável", preco: 45.00, img: "img/pode T Image 8 de set. de 2025, 22_31_52.png" }
];

let DB = JSON.parse(localStorage.getItem('ArteVidroDB')) || { produtos: produtosIniciais, pedidos: [] };

function renderizarLoja() {
    const vitrine = document.getElementById('vitrine');
    if(!vitrine) return;

    vitrine.innerHTML = DB.produtos.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/200?text=Arte+em+Vidro'">
            <div class="card-info">
                <div class="card-price">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
                <div class="card-title">${p.nome}</div>
                <button class="btn-comprar" onclick="finalizarCompra('${p.nome}', ${p.id})">Comprar agora</button>
            </div>
        </div>
    `).join('');
}

function finalizarCompra(nome, id) {
    const idPedido = "AV-" + Math.floor(Math.random() * 1000000);
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    
    new QRCode(qrcodeContainer, {
        text: `Pedido: ${idPedido} | Produto: ${nome}`,
        width: 150, height: 150
    });

    document.getElementById('modal-pedido').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modal-pedido').style.display = 'none';
}

window.onload = renderizarLoja;
const meusProdutos = [
    { id: 1, nome: "Vaso Girassol Artesanal", preco: 120.00, img: "img/girasol WhatsApp Image 2025-08-13 at 17.14.00.jpeg" },
    { id: 2, nome: "Jogo Suqueira Profissional", preco: 180.00, img: "img/6 copos suqueira Image 1 de set. de 2025, 13_30_19.png" },
    { id: 3, nome: "Taça de Cristal Exclusiva", preco: 85.00, img: "img/taça- Image 28 de set. de 2025, 14_21_19.png" },
    { id: 4, nome: "Pote Decorativo Sustentável", preco: 45.00, img: "img/pode T Image 8 de set. de 2025, 22_31_52.png" }
];

function carregarLoja() {
    const grid = document.getElementById('vitrine');
    if(!grid) return;

    grid.innerHTML = meusProdutos.map(p => `
        <div class="card">
            <img src="${p.img}" alt="${p.nome}" onerror="this.src='https://via.placeholder.com/250?text=Verificar+Caminho+Imagem'">
            <div class="card-body">
                <p class="price">R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
                <p class="title">${p.nome}</p>
                <button class="btn-comprar" onclick="comprar('${p.nome}')">Comprar agora</button>
            </div>
        </div>
    `).join('');
}

window.onload = carregarLoja;
