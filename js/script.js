import { formatCurrency, limparFormatoReal } from './ultils.js';
// convertendo pra moeda
// a aula
// https://www.youtube.com/watch?v=p2vg8PiFbJE

// ocutar botar volta e seçao de detalhes do produto

const sectionHero = document.querySelector('.hero');
const selectionProdutos = document.querySelector('.produtos');
const botaoVoltar = document.querySelector('.voltar');
const selectorDetalhesProdutos = document.querySelector('.produto__detalhes');
const sectionCarrinho = document.querySelector('.carrinho');
const botaoCarrinho = document.querySelector('.btn__carrinho .icone');

const ocutarElemeto = (elemeto) => {
  style.display = 'none';
};
const mostraElemento = (elemeto, display = 'block') => {
  elemeto.style.display = display;
};

//NEVEGAÇAO
const ocultarVoltarEsecaoDetalhes = () => {
  botaoVoltar.style.display = 'none';
  selectorDetalhesProdutos.style.display = 'none';
};
ocultarVoltarEsecaoDetalhes();





//  pegando do arquivo json
const getProducts = async () => {
  const response = await fetch(' js/products.json');
  const data = await response.json();

  return data;
};

const generateCard = async () => {
  const products = await getProducts();
  products.map((product) => {
    let card = document.createElement('div');
    card.id = product.id; //identificador do card pelo id
    card.classList.add('card__produtos');
    card.innerHTML = `   <figure>       <img src="images/${
      product.image
    }
    " alt="${product.product_name}">
</figure>
<div class="card__produtos_detalhes">  <h4>${product.product_name}<h4>
<h5>${product.product_name}</h5></div>
<h6>${formatCurrency(product.price)}</h6>
`;

    const listaProdutos = document.querySelector('.lista__produtos');
    listaProdutos.appendChild(card);
    // identificando cada card
    card.addEventListener('click', (eV) => {
      //ocultar produtos e mostra mostra  botar volta e pagina de detalhes do produtos
      selectionProdutos.style.display = 'none';
      botaoVoltar.style.display = 'block';
      selectorDetalhesProdutos.style.display = 'grid';

      //identificar qual card foi clicado
      const cardClicado = eV.currentTarget;
      const idProduto = cardClicado.id; // serve para aplicar o recurso de filtro
      //console.log(idProduto);
      const produtoClicado = products.find(
        (product) => product.id == idProduto
      );
      //console.log(produtoClicado);
      preencheDadosProdutos(produtoClicado);
    });
  });
};

generateCard();
const btnHome = document.querySelector('.link_home');
botaoVoltar.addEventListener('click', () => {
  selectionProdutos.style.display = 'flex';
  ocultarVoltarEsecaoDetalhes();
  resetarSelecao(radios);
});

const preencheDadosProdutos = (product) => {
  // preencher imagens
  const images = document.querySelectorAll(
    '.produto__detalhes_imagens figure img'
  ); // vem em nodeListe tem que transforma em array pra trabalhar com ele
  const imagesArray = Array.from(images);
  imagesArray.map((image) => {
    image.src = `./images/${product.image}`;
  });
  // preecher nome, id,  modelo  e preco
  document.querySelector('.detalhes span').innerHTML = product.id;
  document.querySelector('.detalhes h4').innerHTML = product.product_name;
  document.querySelector('.detalhes h5').innerHTML = product.product_model;
  document.querySelector('.detalhes h6').innerHTML = formatCurrency(
    product.price
  );
};
//selecionar span do id e ocultar
const spanId = document.querySelector('.detalhes span');
spanId.style.display = 'none';

/// mudar icone do details frete
const deteils = document.querySelector('details');
deteils.addEventListener('toggle', () => {
  const summary = document.querySelector('summary');
  summary.classList.toggle('icone-expandir');
  summary.classList.toggle('icone-recolher');
});

// mostra pagina do carrinha escoder a outras paginas
botaoCarrinho.addEventListener('click', () => {
  sectionCarrinho.style.display = 'block';
  selectionProdutos.style.display = 'none';
  selectorDetalhesProdutos.style.display = 'none';
  sectionHero.style.display = 'none';
});
btnHome.addEventListener('click', (event) => {
  event.preventDefault(); //eviata compartamento padrao para que nao der reflech na pagina
  sectionCarrinho.style.display = 'none';
  selectionProdutos.style.display = 'flex';
  sectionHero.style.display = 'flex';
  ocultarVoltarEsecaoDetalhes();
});

const radios = document.querySelectorAll('input[type="radio"]');
radios.forEach((radio) => {
  radio.addEventListener('change', () => {
    const label = document.querySelector(`label[for="${radio.id}"]`);
    label.classList.add('selecionado');
    console.log(label);
    radios.forEach((radioAtual) => {
      if (radioAtual !== radio) {
        const outroLabel = document.querySelector(
          `label[for="${radioAtual.id}"]`
        );
        outroLabel.classList.remove('selecionado');
      }
    });
  });
});
const resetarSelecao = (radios) => {
  radios.forEach((radio) => {
    radios.forEach((radioAtual) => {
      if (radioAtual !== radio) {
        const outroLabel = document.querySelector(
          `label[for="${radioAtual.id}"]`
        );
        outroLabel.classList.remove('selecionado');
      }
    });
  });
};
const cart = [];
const btnAddCarrinho = document.querySelector('.btn__Add_cart');
btnAddCarrinho.addEventListener('click', () => {
  resetarSelecao(radios);
  // pega dados do produtos adicionado
  const produto = {
    id: document.querySelector('.detalhes span').innerHTML,
    nome: document.querySelector('.detalhes h4').innerHTML,
    modelo: document.querySelector('.detalhes h5').innerHTML,
    preco: document.querySelector('.detalhes h6').innerHTML,
    tamanho: document.querySelector('input[type="radio"][name="size"]:checked')
      .value,
  };
  console.log(produto);
  cart.push(produto); //adicionar o produto ao carrinho
  console.log(cart);
  // ocultar botao voltar e secao detalhes produtos
  ocultarVoltarEsecaoDetalhes();
  sectionCarrinho.style.display = 'block';
  sectionHero.style.display = 'none';
  atualizarCarrinho(cart);
  atualizarNumeroItem();
});
const corpoTabela = document.querySelector('.carrinho tbody');

const atualizarCarrinho = (cart) => {
  corpoTabela.innerHTML = ''; //limpar linhas da tabela
  cart.map((produto) => {
    corpoTabela.innerHTML += `
          <tr>
           <td>${produto.id}  </td>
           <td>${produto.nome}  </td>
           <td class="coluna_tamanho">${produto.tamanho}  </td>
           <td class="coluna_preco">${produto.preco}  </td>
           <td class="coluna_apagar">
           <span class="material-symbols-outlined" data-id="${produto.id}">delete
        
          </tr>`;
  });

  const total = cart.reduce((valorAcumulado, item) => {
    return valorAcumulado + limparFormatoReal(item.preco);
  }, 0);
  console.log(total);
  document.querySelector('.coluna_total').innerHTML = formatCurrency(total);
  spanSubTotal.innerHTML = formatCurrency(total);
  spanTotalCompra.innerHTML = formatCurrency(
    total + valorFrete - valorDesconto
  );

  acaoBotaoApagar();
};
const numeroItens = document.querySelector('.numero_itens');
numeroItens.style.display = 'none';
const atualizarNumeroItem = () => {
  numeroItens.style.display = cart.length
    ? 'block' //se tiver item
    : 'none'; //se não tiver item
  numeroItens.innerHTML = cart.length;
};
const acaoBotaoApagar = () => {
  const botaoApagar = document.querySelectorAll('.coluna_apagar span');
  botaoApagar.forEach((botao) => {
    botao.addEventListener('click', () => {
      const id = botao.getAttribute('data-id');
      const posicao = cart.findIndex((item) => item.id == id);
      cart.splice(posicao, 1);
      atualizarCarrinho(cart);
    });
  });
  atualizarNumeroItem();
};

//aula 17
let valorFrete = 10;
let valorDesconto = 10;

const spanSubTotal = document.querySelector('.sub_total');
const spanFrete = document.querySelector('.valor_frete');
const spanDesconto = document.querySelector('.valor_desconto');
const spanTotalCompra = document.querySelector('.total_compra');
spanFrete.innerHTML = formatCurrency(valorFrete);
spanDesconto.innerHTML = formatCurrency(valorDesconto);
