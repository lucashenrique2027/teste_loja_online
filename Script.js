// --- CONFIGURAÇÃO DO BANCO DE DADOS (DATABASE) ---
let DB = JSON.parse(localStorage.getItem('ArteVidroDB')) || {
    estoque: [],
    pedidos: [],
    fornecedores: [],
    caixa: 0
};

// --- GESTÃO DE ESTOQUE (Entrada em Caixas) ---
function darEntradaEstoque() {
    const fornecedor = document.getElementById('fornecedor').value;
    const qtdCaixas = parseInt(document.getElementById('qtd-caixas').value);
    const unPorCaixa = parseInt(document.getElementById('un-por-caixa').value);
    
    const totalUnidades = qtdCaixas * unPorCaixa;
    
    DB.estoque.push({
        data: new Date().toLocaleDateString(),
        fornecedor: fornecedor,
        totalUnidades: totalUnidades
    });

    salvarDB();
    alert(`Sucesso! Foram adicionadas ${totalUnidades} unidades ao estoque.`);
}

// --- SISTEMA DE PEDIDOS E QR CODE ---
function finalizarCompra(produtoNome, valor) {
    const idPedido = "AV-" + Math.floor(Math.random() * 1000000);
    
    const novoPedido = {
        id: idPedido,
        produto: produtoNome,
        valor: valor,
        status: "Pedido Recebido", // Status: Recebido, Em produção, Enviado, Entregue
        pagamento: "Pendente"
    };

    DB.pedidos.push(novoPedido);
    salvarDB();
    
    gerarEtiquetaQR(idPedido);
}

function gerarEtiquetaQR(id) {
    const qrcodeContainer = document.getElementById("qrcode");
    qrcodeContainer.innerHTML = "";
    new QRCode(qrcodeContainer, {
        text: "https://seusite.com/rastreio?id=" + id,
        width: 128,
        height: 128
    });
    document.getElementById('modal-pedido').style.display = 'block';
}

// --- FUNÇÃO SALVAR ---
function salvarDB() {
    localStorage.setItem('ArteVidroDB', JSON.stringify(DB));
}

// --- ALERTAS DE ESTOQUE BAIXO ---
function verificarAlertas() {
    const totalEstoque = DB.estoque.reduce((acc, curr) => acc + curr.totalUnidades, 0);
    if (totalEstoque < 10) {
        document.getElementById('alertas').innerHTML = `⚠️ <strong>ALERTA:</strong> Estoque baixo (${totalEstoque} unidades)! Entre em contato com fornecedores.`;
    }
}