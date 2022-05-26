const main = document.getElementById('main-market');
const conte = document.getElementById('table-shop')

const selectProducts = document.getElementById("select-products");
// const boton1 = document.getElementsByClassName("button-buy");
const productoW = document.getElementById("ProductoW");
const precioW = document.getElementById("PrecioW");
const cantidadW = document.getElementById("CantidadW");
const totalW = document.getElementById("TotalW");


// filtros.
const filterXPrice = document.getElementById('filterXPrice');
const filterXCategories = document.getElementById('filterXCategorie');

filterXPrice.addEventListener('change', filterProducts);
filterXCategories.addEventListener('change', filterCategories);



// Agregar nuevo elemento.

const btnCreate = document.getElementById('btn-create')


let imgSelected = " ";
let idProduct = 0;


const cart = [];


const modal = document.querySelector('.modal');
const closeModal = document.getElementById('close-modal');
const newProduct = document.getElementById('new-product');
const newPrice = document.getElementById('new-price');
const newImage = document.getElementById('new-image');
const btnNewProduct = document.getElementById('btn-new-create');


window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);

// boton de crear nuevo elemento
btnCreate.addEventListener('click', showModal);
btnNewProduct.addEventListener('click', createNewProduct);
newImage.addEventListener('change', importImg);





closeModal.addEventListener('click', CloseModal)

function CloseModal() {

  modal.style.display = 'none';
  
}






// funcion para entregarme la imagen para el nuevo elemento.
function importImg(event) {
  const currentImg = event.target.files[0];
  const objectURL = URL.createObjectURL(currentImg);
  imgSelected = objectURL;


}



// funcion al boton, para mis nuevos productos.
function createNewProduct () {
  idProduct++;
  const titleProduct = newProduct.value;
  const priceProducts = Number(newPrice.value);
  const id = idProduct;

  const productNew = {id: id, name: titleProduct, price: priceProducts, img:imgSelected};

// esto me va agregar el arreglo a mis productos.
  products.push(productNew);
  listSelect();
  modal.style.display = 'none';



}



// hacer aparecer mi div para agregar elementos ya que se encuentra oculto.
function showModal() {
  modal.style.display = 'flex';
}


function filterCategories(categorie){
 
  const responser = categorie.target.value === 'Acción'
  ? products.filter (Pcrdt => Pcrdt.categorie === 'Acción')

  : categorie.target.value === 'Aventura'
  ? products.filter( Prcdt => Prcdt.categorie === 'Aventura')

  : categorie.target.value === 'Terror'
  ? products.filter( Pcrdt => Pcrdt.categorie === 'Terror')
 
  : categorie.target.value === 'Romance'
  ? products.filter( Pcrdt => Pcrdt.categorie === 'Romance')

  :categorie.target.value === 'Ficción'
  ? products.filter (Prcdt => Prcdt.categorie === 'Ficción')
  : null;
  
  main.innerHTML = '';
  responser.map( Prcdt => createCards(Prcdt));

}


function filterProducts(event) {

  const responseFilter = event.target.value === 'Menos de 100'
  ? products.filter (Pcrdt => Pcrdt.price < 100)

  : event.target.value === 'Entre 100 y 300'
  ? products.filter( Pcrdt => Pcrdt.price >= 100 &&  Pcrdt.price <= 300)

  : event.target.value === 'Entre 400 y 900'
  ? products.filter( Pcrdt => Pcrdt.price >= 400 && Pcrdt.price <= 900)
 
  : event.target.value === 'Entre 1.000 y 1.200'
  ? products.filter( Pcrdt => Pcrdt.price >= 1000 &&  Pcrdt.price <= 1200)
  : null;
  
  main.innerHTML = '';
  responseFilter.map( Prcdt => createCards(Prcdt));

}


function renderCards() {
  products.map( Prcdt => { Prcdt.name === selectProducts.value ? createCards(Prcdt) : null } );
}




function listSelect() {
  
  selectProducts.innerHTML = '';  
  const anyOption = document.createElement('option');
  selectProducts.appendChild(anyOption);
  anyOption.textContent = 'Selecciona El Producto';
  products.map( Prcdt => {
    const option = document.createElement('option');
    option.value = Prcdt.name;
    option.textContent = Prcdt.name;
    selectProducts.appendChild(option);
    document.getElementById('tabla').style.display = "none"

  });
}

// ----------------------------------------------------------------

// SECCION DE CREACION DE CARTAS Y MODIFICACION DE DATOS
function  createCards(Prcdt) {
 const {name, img, id, price, quantity} = Prcdt

  const card = document.createElement('div');
  card.classList.add("card");


  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',img);
  imgCard.setAttribute('alt',`${name}`);
  // imgCard.setAttribute('draggable', false);

  const title = document.createElement('h3');
  title.textContent = name;

  const prices = document.createElement("p");
    prices.textContent =  '$' + price;



    const btnAdd = document.createElement('button');
    btnAdd.setAttribute('id',name);
    btnAdd.classList.add('btn-add');
    btnAdd.textContent = "Add to Cart";
    btnAdd.addEventListener('click', addToCart);
  // const boton2 = document.createElement("button")

  

  // boton2.setAttribute('id','tarjetas');
  
  // pBtn.textContent = "ADD CART WAIFU"

  
  card.appendChild(imgCard);
  card.appendChild(title);
  card.appendChild(prices);
  main.appendChild(card);
  // card.appendChild(boton)
  card.appendChild(btnAdd)

  
  // boton.classList.add("btn-cart")
  btnAdd.classList.add("button-buy")

  btnAdd.addEventListener('click', addToCart);

  // btnAdd.addEventListener('click', deshabilitar)


  // // ----------------------------------------------------------------------------------
  // function deshabilitar() {
  //   btnAdd.disabled = true
  //   pBtn.textContent = "SE AÑADIO AL CARRO"
  //   pBtn.style.color = "black"
  // }


// SECCION DEL CARRO DE COMPRAS


// SECCION DE SUMA DE PRECIOS Y CONTADOR DE CANTIDAD DE PRODUCTOS

function addToCart(event) {

  // 1. identificar  el producto
  const Product = event.target.id;  
  console.log(Product);

  // 2. Trae el producto
  const productSelected = products.find( cacas => cacas.name === Product);
  console.log(productSelected);     

  if(cart.length === 0) {
    cart.push(productSelected);      
  }
  else {
    const isExist = cart.find( product => product.id === productSelected.id );
    if(isExist === undefined) {
      cart.push(productSelected);
    } else {
      isExist.quantity++;
    }
  }
  conte.innerHTML = '';
  cart.map( element => {      
    carrito(element);
  })  
  } 
  
function carrito(Prcdt) {
 let count = Prcdt.quantity

    document.getElementById('tabla').style.display = "block"



    // SECCION DE CREACION DE TABLA POR CLICK

  const table = document.createElement('tr');
  const productoW = document.createElement('td');
  const precioW = document.createElement('td');
  const cantidadW = document.createElement("td");
  const cantidadP = document.createElement("p")
  const agg = document.createElement("button")
  const rm = document.createElement("button")

  const totalW = document.createElement("td")
  const totalP = document.createElement("p")

  // SECCION DE MODIFICACION DE DATOS DE LA TABLA
  agg.classList.add('button-agg');
  agg.textContent = "+"
  rm.classList.add('button-rm');
  rm.textContent = "-"
  // cantidadP.setAttribute('id',contenido)

  productoW.textContent = Prcdt.name;
  precioW.textContent = `$${Prcdt.price}`

  cantidadP.textContent = count
  totalP.textContent = `$${Prcdt.quantity * Prcdt.price}`


  totalW.appendChild(totalP)
  cantidadW.appendChild(cantidadP)
  cantidadW.appendChild(rm)
  cantidadW.appendChild(agg)
  table.appendChild(productoW);
  table.appendChild(precioW);
  conte.appendChild(table);
  table.appendChild(cantidadW);
  table.appendChild(totalW);
  agg.addEventListener('click',sumas)
  rm.addEventListener('click',restas)







const total = [price]





function sumas() {

  let final = price;

  final = final + count * price
  count = count + 1
  cantidadP.textContent= count

  totalP.textContent =  `$${final}`
  total.push(price)
  

}

function restas() {
  if(count <= 0){
    cantidadP.textContent = 0 
    totalP.textContent = `$0`
  }else{
    let final = price;

  final = final + count * price
  count = count - 2
  cantidadP.textContent= count

  totalP.textContent =  `$${final}`
  total.push(price)
  
  }
  }




}



}