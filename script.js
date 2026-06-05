const carrinho = [];

function adicionar(nome, preco) {
    carrinho.push({
        nome,
        preco
    });

    atualizarResumo();
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarResumo();
}

function limparCarrinho() {
    carrinho.length = 0;

    document.getElementById("outroServico").value = "";

    atualizarResumo();
}

function atualizarResumo() {

    const lista = document.getElementById("lista-servicos");
    const totalElement = document.getElementById("total");
    const contador = document.getElementById("contadorItens");

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco;

        lista.innerHTML += `
            <li class="d-flex justify-content-between align-items-center">
                
                <span>
                    ✓ ${item.nome} - R$ ${item.preco}
                </span>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="remover(${index})">
                    X
                </button>

            </li>
        `;
    });

    totalElement.innerText = `R$ ${total}`;
    contador.innerText = `${carrinho.length} item(ns) selecionado(s)`;
}

function enviarWhats() {

    const outro =
        document.getElementById("outroServico").value;

    if (carrinho.length === 0 && outro.trim() === "") {
        alert("Selecione ao menos um serviço.");
        return;
    }

    let mensagem =
`Olá!

Gostaria de solicitar um orçamento.

`;

    let total = 0;

    if (carrinho.length > 0) {

        mensagem += `Serviços selecionados:

`;

        carrinho.forEach(item => {

            mensagem += `✓ ${item.nome} - R$${item.preco}
`;

            total += item.preco;
        });

        mensagem += `
Valor estimado: R$${total}

`;
    }

    if (outro.trim() !== "") {

        mensagem += `Outro serviço solicitado:

${outro}

`;
    }

    mensagem += `Aguardo retorno.`;

    const numero = "5511989695151";

    const url =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
}