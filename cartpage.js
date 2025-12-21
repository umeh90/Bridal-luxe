const cartCount = document.getElementById('cartcount')
const cartSlide = document.querySelector('.cartslide')
const cartItems = document.querySelector('.cart-items')
const subTotal = document.getElementById('subtotal')
const taxes = document.getElementById('taxes')
const totaling = document.getElementById('totaling')
const endTotal = document.getElementById('endtotal')
let cart = JSON.parse(localStorage.getItem('cartContent')) || []
 function openCart(){
    cartSlide.classList.add('show')
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
 }
 function closingTag(){
    cartSlide.classList.remove('show')
    document.body.style.overflow = ""
     document.documentElement.style.overflow = ""
 }
 function saveCart(){
    localStorage.setItem('cartContent', JSON.stringify(cart))
 }
 let itemSize;
function selectBtn(button, size){
    
    const product = button.closest('.sizebtn')
    const sizes = product.querySelectorAll('.btnsize')
    if(button.classList.contains('activity')){
      button.classList.remove('activity')
      itemSize = null
      return 
    }
    sizes.forEach(item => item.classList.remove('activity'));
    button.classList.add('activity')
    itemSize = size;
 }
 function resetSelectedSize(){
   const sizing = document.querySelectorAll('.btnsize')
   sizing.forEach(item => item.classList.remove('activity'))
   cart.forEach(item => {
      const productCard = document.querySelectorAll('.imaging')
      productCard.forEach(card =>{
         if(card.innerHTML.includes(item.description)){
            const sizes = card.querySelectorAll('.btnsize')
            sizes.forEach(btn => {
               if(btn.textContent.trim() === item.itemSize){
                  btn.classList.add('activity')
               }else{
                  btn.classList.remove('activity')
               }
            })
         }
      })
   })
 }
 function addToCart(image, description, price){
   if(!itemSize){
      alert('Kindly select a size')
      return;
   }
 const existing = cart.find(item => item.description === description && item.itemSize === itemSize)
 if(existing){
   existing.quantity++;
 }else{
   cart.push({image, description, price, quantity: 1, itemSize})
 }
 itemSize = null
 saveCart()
 renderCart()
 }
 function renderCart(){
   cartItems.innerHTML = ""
   if(cart.length === 0){
      cartItems.innerHTML = '<p style="text-align:center;margin-top:20px;">Your cart is empty </p>'
   }
   let total = 0;
   let subtotal = 0;
  
   cart.forEach((item, index) =>{
      total = item.price * item.quantity
      subtotal += total
      const taskDiv = document.createElement('div')
      taskDiv.className = 'cartDisplay'
      taskDiv.innerHTML = `
     
<div>
	<img src="${item.image}" alt="${item.description}" class="proimage">
</div>
 
<div  class="product">Product Name: ${item.description} <br> Size: ${item.itemSize}</div>
<div  class="products sizing">${item.price.toLocaleString()}</div>
<div class="mobile">
<div class="qtyalign">
	<button onclick="qtyChange(${index}, -1)">-</button>
	<span>${item.quantity}</span>
	<button onclick="qtyChange(${index}, 1)">+</button>
</div>
<div  class="products">${total.toLocaleString()}</div>
<div  class="deleteicon">
	<button onclick="remove(${index})"><img src="images/cancel.png" alt="deleteicon"></button>
</div>
</div>
 `
 cartItems.appendChild(taskDiv)
   });
    const tax = 0.075 * subtotal;
   const finalTotal = tax + subtotal;
   cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0)
   subTotal.textContent = subtotal.toLocaleString()
   taxes.textContent = tax.toLocaleString()
    totaling.textContent = finalTotal.toLocaleString()
   endTotal.textContent = finalTotal.toLocaleString()
 }
 function qtyChange(index, change){
   cart[index].quantity += change
   if(cart[index].quantity <= 0){
      remove(index)
   }
   saveCart()
   renderCart()
 }
 function remove(index){
   if(confirm('Are you sure you want to delete this item?')){
      cart.splice(index, 1)
   }
   resetSelectedSize()
saveCart()
renderCart()
 }
 function resetSize() {
   const sizing1 = document.querySelectorAll('.btnsize')
   sizing1.forEach(item => item.classList.remove('activity'))
   itemSize = null
 }
 function checkOut(){
   alert('Thankyou for shopping with us')
   localStorage.removeItem('cartContent')
   cart = []
   resetSize()
   saveCart()
   renderCart()
 }
 document.addEventListener('DOMContentLoaded', ()=>{
   renderCart()
   resetSelectedSize()
 })
