document.addEventListener("DOMContentLoaded", () => {

const year = new Date().getFullYear()
console.log(year)

document.querySelectorAll("[data-year]").forEach(el=>{
el.textContent = year
})

const btn = document.getElementById("menu-btn")
const menu = document.getElementById("menu")

if(btn && menu){

btn.addEventListener("click",()=>{
menu.classList.toggle("hidden")
})

}

})
