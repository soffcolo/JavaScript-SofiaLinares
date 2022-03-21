const carrito = document.getElementById("carrito");
const Botas = document.getElementById("lista-Botas");
const listaBotas = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");

cargarEventListeners();

function cargarEventListeners() {
    Botas.addEventListener("click", comprarBota);
  carrito.addEventListener("click", eliminarBota);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarBota(e) {

    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const Bota = e.target.parentElement.parentElement;
        leerDatosBota(Bota);
    }
}

function leerDatosBota(Bota){
    const infoBota = {
        imagen: Bota.querySelector('img').src,
        titulo: Bota.querySelector('h4').textContent,
        precio: Bota.querySelector('.precio span').textContent,
        id: Bota.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoBota);
}

function insertarCarrito(Bota) {
    const row = document.createElement('tr');
    row.innerHTML = `
       <td>
           <img src="${Bota.imagen}" width=100> 
       </td> 
       <td>${Bota.titulo}</td>
       <td>${Bota.precio}</td>
       <td>
        <a href="#" class="borrar-Bota" data-id="${Bota.id}">X</a>
       </td>
    `;
    listaBotas.appendChild(row);
    guardarBotaLocalStorage(Bota);
}

function eliminarBota(e) {
    e.preventDefault();

    let Bota,
        BotaId;
    
    if(e.target.classList.contains('borrar-Bota')) {
        e.target.parentElement.parentElement.remove();
        Bota = e.target.parentElement.parentElement;
        BotaId = Bota.querySelector('a').getAttribute('data-id');
    }
    eliminarBotaLocalStorage(BotaId)
}

function vaciarCarrito(){
    while(listaBotas.firstChild){
        listaBotas.removeChild(listaBotas.firstChild);
    }
    vaciarLocalStorage();

    return false;
}

function guardarBotaLocalStorage(Bota) {
    let Botas;

    Botas = obtenerBotasLocalStorage();
    Botas.push(Bota);

    localStorage.setItem('Botas', JSON.stringify(Botas));
}

function obtenerBotaslosLocalStorage() {
    let BotasLS;

    if(localStorage.getItem('Botas') === null) {
        BotasLS = [];
    }else {
        BotasLS = JSON.parse(localStorage.getItem('Botas'));
    }
    return BotasLS;
}

function leerLocalStorage() {
    let BotasLS;

    BotasLS = obtenerBotasLocalStorage();

    BotasLS.forEach(function(Bota){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${Bota.imagen}" width=100>
            </td>
            <td>${Bota.titulo}</td>
            <td>${Bota.precio}</td>
            <td>
                <a href="#" class="borrar-Bota" data-id="${Bota.id}">X</a>
            </td>
        `;
        listaBotas.appendChild(row);
    });
}

function eliminarBotaLocalStorage(Bota) {
    let BotasLS;
    BotasLS = obtenerBotasLocalStorage(); 

    BotasLS.forEach(function(BotaLS, index){
        if(BotaLS.id === Bota) {
            BotasLS.splice(index, 1);
        }
    });

    localStorage.setItem('Botas', JSON.stringify(BotasLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}

function alerta (){
    alert("Agregado al carrito")
}

function alertaremovido (){
    alert("Carrito vacio")
}
