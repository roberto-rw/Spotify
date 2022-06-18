const button = document.querySelector('.menu_button');
const nav = document.querySelector('.nav__links');
const linkCarrito = document.querySelector('.link_carrito');
const tablaCarrito = document.querySelector('.nav__link--listaCarrito');


cargarEventsListeners();

function cargarEventsListeners(){
    button.addEventListener('click', desplegarMenu);
}

function desplegarMenu(){
    nav.classList.toggle('nav__links_activo');
    agregarLinkCarrito();
}

function agregarLinkCarrito(){
    linkCarrito.href = "/HTML/carrito_mobile.html";
}

function bloquearTablaCarrito(){
    tablaCarrito.style.display = 'none';
}


