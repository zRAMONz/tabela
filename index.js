// Função para atualizar a quantidade de itens
function atualizarQuantidade(e) {
  const inputQuantidade = e.target.parentNode.querySelector('input[type="text"]');
  const valorAtual = parseInt(inputQuantidade.value);
  const incremento = e.target.classList.contains('quantidade-plus') ? 1 : -1;
  const novoValor = valorAtual + incremento;
  if (novoValor >= 0) {
    inputQuantidade.value = novoValor;
  }
}

// Função para enviar o pedido via WhatsApp
function enviarPedido() {
  const produtos = Array.from(document.querySelectorAll('tbody tr')).map(tr => {
    const nome = tr.querySelector('td:first-child').textContent;
    const cores = Array.from(tr.querySelectorAll('input[name="cor"]:checked')).map(input => input.value);
    const tamanhos = Array.from(tr.querySelectorAll('input[name="tamanho"]:checked')).map(input => input.value);
    const quantidade = parseInt(tr.querySelector('input[name="quantidade"]').value);
    return {
      nome,
      cores,
      tamanhos,
      quantidade,
    };
  });
  const mensagem = encodeURIComponent(`Olá, gostaria de fazer o seguinte pedido:\n\n${produtos.map(p => {
    const cor = p.cores.length === 1 ? p.cores[0] : `(${p.cores.join('/')})`;
    const tamanho = p.tamanhos.length === 1 ? p.tamanhos[0] : `(${p.tamanhos.join('/')})`;
    return `- ${p.nome} (${cor}, ${tamanho}) x${p.quantidade}`;
  }).join('\n')}`);
  window.open(`https://wa.me/11-999999999?text=${mensagem}`, '_blank');
}

// Adicionar listeners aos botões de quantidade
const botoesQuantidade = document.querySelectorAll('.quantidade-minus, .quantidade-plus');
botoesQuantidade.forEach(botao => {
  botao.addEventListener('click', atualizarQuantidade);
});

// Adicionar listener ao botão de enviar
const botaoEnviar = document.querySelector('#enviar');
botaoEnviar.addEventListener('click', enviarPedido);
