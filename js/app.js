function adicionar(){
    const produtoSelect = document.getElementById('produto')
    const produtoSelecionado = produtoSelect.value
    const quantidadeInput = document.getElementById('quantidade')
    const quantidadeValor = quantidadeInput.value

    if (!quantidadeValor || quantidadeValor <= 0){
        alert('Por favor insira uma quantidade para adicionar o produto ao carrinho')
        return
    }

    const [nomeProduto, precoProduto] = produtoSelecionado.split(' - R$')
    const precoUnitario = parseFloat(precoProduto)
    const quantidade = parseInt(quantidadeValor)

    const listaProdutos = document.getElementById('lista-produtos')
    const produtosExistentes = listaProdutos.getElementsByClassName('carrinho__produtos__produto')
    let produtoJaExiste = false

    for (let i = 0; i < produtosExistentes.length; i++){
        const produtoTexto = produtosExistentes[i].innerText

        if(produtoTexto.includes(nomeProduto)){
            produtoJaExiste = true
            
            const quantidadeExistente = parseInt(produtosExistentes[i].querySelector('.texto-azul').innerText)
            const novaQuantidade = quantidadeExistente + quantidade        
            const precoTotalProduto = precoUnitario * novaQuantidade

            produtosExistentes[i].innerHTML = `<span class="texto-azul">${novaQuantidade}x</span> ${nomeProduto} <span class="texto-azul">R$${precoTotalProduto.toFixed(2)}</span>`
        
            const valorTotalSpan = document.getElementById('valor-total')
            const valorTotalAtual = parseFloat(valorTotalSpan.innerText.replace('R$', ''))
            const novoValorTotal = valorTotalAtual + (quantidade * precoUnitario)
            valorTotalSpan.innerText = `R$${novoValorTotal.toFixed(2)}`
            break
        }
    }

    if(!produtoJaExiste){
        const novoProduto = document.createElement('section')
        novoProduto.classList.add('carrinho__produtos__produto')
        const precoTotalProduto = precoUnitario * quantidade
        novoProduto.innerHTML = `<span class="texto-azul">${quantidade}x</span> ${nomeProduto} <span class="texto-azul">R$${precoTotalProduto.toFixed(2)}</span>`
        listaProdutos.appendChild(novoProduto)

        const valorTotalSpan = document.getElementById('valor-total')
        const valorTotalAtual = parseFloat(valorTotalSpan.innerText.replace('R$', ''))
        const novoValorTotal = valorTotalAtual + precoTotalProduto
        valorTotalSpan.innerText = `R$${novoValorTotal.toFixed(2)}`
    }
    quantidadeInput.value = ' '
}

function limpar(){
    let texto = 'Tem certeza que deseja limpar o carrinho de compras?'
    if(confirm(texto) == true){
        const listaProdutos = document.getElementById('lista-produtos')
        listaProdutos.innerHTML = ' '

        const valorTotalSpan = document.getElementById('valor-total')
        valorTotalSpan.innerText = 'R$0.00'
    }
    else{
        return
    }
} 