const products = [
{id:1,name:"Studio Wireless Headphones",category:"audio",categoryLabel:"Audio",price:3499,rating:4.8,reviews:124,badge:"Bestseller",icon:"🎧",description:"Comfortable over-ear sound for music, calls and focus."},
{id:2,name:"Compact Bluetooth Speaker",category:"audio",categoryLabel:"Audio",price:2199,rating:4.5,reviews:86,badge:"Popular",icon:"🔊",description:"Portable sound with a clean, minimal design."},
{id:3,name:"Mechanical Keyboard",category:"accessories",categoryLabel:"Accessories",price:4299,rating:4.9,reviews:203,badge:"Top rated",icon:"⌨️",description:"Tactile keys and a compact layout for daily work."},
{id:4,name:"Wireless Mouse",category:"accessories",categoryLabel:"Accessories",price:1299,rating:4.4,reviews:97,badge:"",icon:"🖱️",description:"A lightweight mouse with a precise sensor."},
{id:5,name:"Aluminium Laptop Stand",category:"workspace",categoryLabel:"Workspace",price:1899,rating:4.6,reviews:112,badge:"Staff pick",icon:"💻",description:"Raise your screen for a more comfortable desk setup."},
{id:6,name:"LED Desk Lamp",category:"workspace",categoryLabel:"Workspace",price:999,rating:4.3,reviews:61,badge:"",icon:"💡",description:"Adjustable lighting for focused work and study."},
{id:7,name:"USB-C Multiport Hub",category:"accessories",categoryLabel:"Accessories",price:2799,rating:4.7,reviews:145,badge:"Popular",icon:"🔌",description:"Extra connectivity for your laptop and peripherals."},
{id:8,name:"Desk Mat",category:"workspace",categoryLabel:"Workspace",price:799,rating:4.2,reviews:48,badge:"",icon:"▰",description:"A smooth, easy-to-clean surface for your workspace."},
{id:9,name:"Wired Studio Earphones",category:"audio",categoryLabel:"Audio",price:699,rating:4.1,reviews:73,badge:"Value pick",icon:"🎵",description:"Simple everyday earphones with a balanced sound."}
];
const grid=document.getElementById("productGrid"),count=document.getElementById("productCount");
const categoryInputs=document.querySelectorAll('input[name="category"]'),priceRange=document.getElementById("priceRange");
const priceValue=document.getElementById("priceValue"),sortSelect=document.getElementById("sortSelect");
const emptyState=document.getElementById("emptyState"),activeFilters=document.getElementById("activeFilters");
const money=value=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
function selectedCategory(){return document.querySelector('input[name="category"]:checked').value;}
function renderProducts(){
 const category=selectedCategory(),maxPrice=Number(priceRange.value);
 let visible=products.filter(p=>(category==="all"||p.category===category)&&p.price<=maxPrice);
 switch(sortSelect.value){
  case "rating-desc":visible.sort((a,b)=>b.rating-a.rating);break;
  case "price-asc":visible.sort((a,b)=>a.price-b.price);break;
  case "price-desc":visible.sort((a,b)=>b.price-a.price);break;
  case "name-asc":visible.sort((a,b)=>a.name.localeCompare(b.name));break;
  default:visible.sort((a,b)=>a.id-b.id);
 }
 count.textContent=`Showing ${visible.length} of ${products.length} products`;priceValue.textContent=money(maxPrice);
 grid.innerHTML=visible.map(p=>`<article class="product-card">
 <div class="product-art ${p.category}">${p.badge?`<span class="product-badge">${p.badge}</span>`:""}<span class="product-emoji" aria-hidden="true">${p.icon}</span><span class="product-art-label">${p.categoryLabel}</span></div>
 <div class="product-info"><div class="product-meta"><span>${p.categoryLabel}</span><span>★ ${p.rating} <small>(${p.reviews})</small></span></div>
 <h3>${p.name}</h3><p>${p.description}</p><div class="product-bottom"><strong>${money(p.price)}</strong><button class="add-button" type="button" data-product="${p.id}" aria-label="Add ${p.name} to demo bag">+</button></div></div></article>`).join("");
 emptyState.hidden=visible.length!==0;grid.hidden=visible.length===0;
 const tags=[];if(category!=="all")tags.push(category[0].toUpperCase()+category.slice(1));if(maxPrice<5000)tags.push(`Up to ${money(maxPrice)}`);
 activeFilters.innerHTML=tags.map(t=>`<span class="filter-chip">${t}</span>`).join("");
}
categoryInputs.forEach(i=>i.addEventListener("change",renderProducts));priceRange.addEventListener("input",renderProducts);sortSelect.addEventListener("change",renderProducts);
function resetFilters(){document.querySelector('input[name="category"][value="all"]').checked=true;priceRange.value=5000;sortSelect.value="featured";renderProducts();}
document.getElementById("clearFilters").addEventListener("click",resetFilters);document.getElementById("resetEmpty").addEventListener("click",resetFilters);
grid.addEventListener("click",e=>{const b=e.target.closest("[data-product]");if(!b)return;const p=products.find(x=>x.id===Number(b.dataset.product));if(p){b.textContent="✓";b.classList.add("added");b.setAttribute("aria-label",`${p.name} selected`);setTimeout(()=>{b.textContent="+";b.classList.remove("added");b.setAttribute("aria-label",`Add ${p.name} to demo bag`);},1100);}});
renderProducts();
