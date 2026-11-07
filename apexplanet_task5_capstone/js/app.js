const products=[
{id:1,name:"Studio Wireless Headphones",cat:"audio",price:3499,rating:4.8,tag:"Bestseller",img:"images/headphones.svg"},
{id:2,name:"Compact Bluetooth Speaker",cat:"audio",price:2199,rating:4.6,tag:"Popular",img:"images/speaker.svg"},
{id:3,name:"Mechanical Keyboard",cat:"accessories",price:4299,rating:4.9,tag:"Top rated",img:"images/keyboard.svg"},
{id:4,name:"Wireless Precision Mouse",cat:"accessories",price:1299,rating:4.5,tag:"",img:"images/mouse.svg"},
{id:5,name:"Aluminium Laptop Stand",cat:"desk",price:1899,rating:4.7,tag:"Staff pick",img:"images/stand.svg"},
{id:6,name:"Minimal LED Desk Lamp",cat:"desk",price:999,rating:4.4,tag:"",img:"images/lamp.svg"},
{id:7,name:"USB-C Multiport Hub",cat:"accessories",price:2799,rating:4.7,tag:"Popular",img:"images/hub.svg"},
{id:8,name:"Premium Desk Mat",cat:"desk",price:799,rating:4.3,tag:"Value pick",img:"images/mat.svg"}];
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
let category="all",cart=(()=>{try{return JSON.parse(localStorage.getItem("technest-cart-v1"))||{}}catch{return {}}})();
function save(){try{localStorage.setItem("technest-cart-v1",JSON.stringify(cart))}catch{}}
function renderProducts(){let q=$("#searchInput").value.trim().toLowerCase(),sort=$("#sortSelect").value,list=products.filter(p=>(category==="all"||p.cat===category)&&p.name.toLowerCase().includes(q));if(sort==="rating")list.sort((a,b)=>b.rating-a.rating);if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));$("#resultCount").textContent=list.length+" products";$("#productGrid").innerHTML=list.map(p=>`<article class="card"><div class="photo">${p.tag?`<span class="tag">${p.tag}</span>`:""}<img src="${p.img}" alt="${p.name}" loading="lazy" decoding="async" width="480" height="380"></div><div class="info"><span class="cat">${p.cat==="desk"?"Desk setup":p.cat}</span><h3>${p.name}</h3><div class="rating">★★★★★ <span>${p.rating}/5</span></div><div class="bottom"><strong class="price">${money(p.price)}</strong><button class="add" data-add="${p.id}" aria-label="Add ${p.name} to cart">+</button></div></div></article>`).join("");$("#noResults").hidden=!!list.length;$("#productGrid").hidden=!list.length}
function entries(){return Object.entries(cart).map(([id,qty])=>({p:products.find(x=>x.id===+id),qty})).filter(x=>x.p&&x.qty>0)}
function renderCart(){let es=entries(),count=es.reduce((n,x)=>n+x.qty,0),sub=es.reduce((n,x)=>n+x.p.price*x.qty,0);$("#cartCount").textContent=count;$("#cartItems").innerHTML=es.map(({p,qty})=>`<div class="cart-line"><img src="${p.img}" alt=""><div><h4>${p.name}</h4>${money(p.price)}<div class="qty"><button data-qty="${p.id}" data-d="-1">−</button>${qty}<button data-qty="${p.id}" data-d="1">+</button></div><button class="remove" data-remove="${p.id}">Remove</button></div><b>${money(p.price*qty)}</b></div>`).join("");$("#cartEmpty").hidden=count>0;$("#summary").hidden=!count;$("#subtotal").textContent=money(sub);$("#delivery").textContent=sub>=2000?"Free":money(99);$("#total").textContent=money(sub+(sub&&sub<2000?99:0))}
let timer;function toast(t){$("#toast").textContent=t;$("#toast").classList.add("show");clearTimeout(timer);timer=setTimeout(()=>$("#toast").classList.remove("show"),2000)}
function open(){ $("#drawer").classList.add("open");$("#drawer").setAttribute("aria-hidden","false");$("#overlay").hidden=false;document.body.style.overflow="hidden"}
function close(){ $("#drawer").classList.remove("open");$("#drawer").setAttribute("aria-hidden","true");$("#overlay").hidden=true;document.body.style.overflow=""}
$("#productGrid").addEventListener("click",e=>{let b=e.target.closest("[data-add]");if(!b)return;cart[b.dataset.add]=(cart[b.dataset.add]||0)+1;save();renderCart();toast("Added to your cart")});
$("#cartItems").addEventListener("click",e=>{let r=e.target.closest("[data-remove]"),q=e.target.closest("[data-qty]");if(r)delete cart[r.dataset.remove];if(q){let id=q.dataset.qty;cart[id]=(cart[id]||0)+ +q.dataset.d;if(cart[id]<=0)delete cart[id]}save();renderCart()});
$$(".categories button").forEach(b=>b.addEventListener("click",()=>{$$(".categories button").forEach(x=>x.classList.remove("active"));b.classList.add("active");category=b.dataset.cat;renderProducts()}));
$("#searchInput").addEventListener("input",renderProducts);$("#sortSelect").addEventListener("change",renderProducts);
$("#resetFilters").addEventListener("click",()=>{$("#searchInput").value="";category="all";$("#sortSelect").value="featured";$$(".categories button").forEach(b=>b.classList.toggle("active",b.dataset.cat==="all"));renderProducts()});
$("#openCart").addEventListener("click",open);$("#closeCart").addEventListener("click",close);$("#overlay").addEventListener("click",close);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){close();$("#modal").hidden=true}});
$("#checkout").addEventListener("click",()=>{$("#modal").hidden=false;close()});
function finish(){$("#modal").hidden=true;cart={};save();renderCart();toast("Demo cart cleared. Thanks for visiting!")};
$("#finish").addEventListener("click",finish);$("#modalClose").addEventListener("click",()=>$("#modal").hidden=true);
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();$("#newsMessage").textContent="Thanks! This demo does not send or store your email.";e.target.reset()});
$("#year").textContent=new Date().getFullYear();renderProducts();renderCart();
