

// convertendo pra moeda
// a aula
// https://www.youtube.com/watch?v=p2vg8PiFbJE
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
let card = document.createElement('div') 
 card.classList.add('card__produtos')
card.innerHTML = `   <figure>       <img src="images/${product.image}" alt="${product.product_name}">
</figure>
            <div class="card__produtos_detalhes">  <h4>${product.product_name}</h4>
               <h5>${product.product_name}</h5>
               </div>
               <h6>${formatCurrency(product.price)}</h6>
`;
const listaProdutos = document.querySelector('.lista__produtos')
listaProdutos.appendChild(card)
 })
}
generateCard()