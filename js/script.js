

// convertendo pra moeda
// a aula
// https://www.youtube.com/watch?v=p2vg8PiFbJE

// ocutar botar volta e seçao de detalhes do produto
const selectionProdutos = document.querySelector('.produtos');
const botaoVoltar = document.querySelector(".voltar")
const selectorDetalhesProdutos = document.querySelector('.produto__detalhes');
botaoVoltar.style.display = 'none'
selectorDetalhesProdutos.style.display = 'none'


const formatCurrency= (number)=> {
    return number.toLocaleString('pt-BR',{
        style: "currency",
        currency:"BRL",
    })
}


const getProducts = async ()=>{
    const response = await fetch(" js/products.json")
    const data = await response.json()
   
    return data
}


const generateCard = async () => {
const products = await getProducts()
products.map(product=>{
let card = document.createElement('div');
card.id = product.id //identificador do card pelo id
card.classList.add('card__produtos');
card.innerHTML = `   <figure>       <img src="images/${
product.image
}" alt="${product.product_name}">
</figure>
<div class="card__produtos_detalhes">  <h4>${product.product_name}<h4>
<h5>${product.product_name}</h5></div>
<h6>${formatCurrency(product.price)}</h6>
`;
const listaProdutos = document.querySelector('.lista__produtos');
listaProdutos.appendChild(card);
// identificando cada card
card.addEventListener('click',(eV) => {
//ocultar produtos e mostra mostra  botar volta e pagina de detalhes do produtos
selectionProdutos.style.display = 'none';
botaoVoltar.style.display = 'block'
selectorDetalhesProdutos.style.display = 'grid'


//identificar qual card foi clicado
const cardClicado = eV.currentTarget
const idProduto =cardClicado.id// serve para aplicar o recurso de filtro
//console.log(idProduto);
const produtoClicado = products.find(product => product.id ==idProduto)
//console.log(produtoClicado);
preencheDadosProdutos(produtoClicado)
})


    })
    }

    generateCard()
    botaoVoltar.addEventListener('click', () => {
        selectionProdutos.style.display = 'flex';
          botaoVoltar.style.display = 'none';
      selectorDetalhesProdutos.style.display = 'none';
      
    
    });
    const preencheDadosProdutos = (product)=> {
        // preencher imagens
        const images = document.querySelectorAll(
          '.produto__detalhes_imagens figure img'
        );// vem em nodeListe tem que transforma em array pra trabalhar com ele
      const imagesArray = Array.from(images)
      imagesArray.map(image => {
        image.src = `./images/${product.image}`
      })
    

        // preecher nome,  modelo  e preco
        document.querySelector('.detalhes h4').innerHTML= product.product_name
        document.querySelector('.detalhes h5').innerHTML= product.product_model
        document.querySelector('.detalhes h6').innerHTML = formatCurrency(product.price)
    }