const carrito = document.querySelector(".nav__link--carrito");
const listaCarrito = document.querySelector(".nav__link--listaCarrito tbody");
const vaciarCarritoButton = document.querySelector(".nav__vaciar");
const listaAlbumes = document.querySelector('.card__container');
let arregloCarrito = [];


cargarEventsListeners();

function cargarEventsListeners(){
    //Cuando agregas un album presionando 'Agregar'
    listaAlbumes.addEventListener('click', agregarAlbum);

    //Elimina albums del carrito
    carrito.addEventListener('click', eliminarAlbum);

    //Muestra los cursos de Local Storage
    document.addEventListener('DOMContentLoaded', () => {
        arregloCarrito = JSON.parse(localStorage.getItem('carrito') || []);
        carritoHTML(); //Para que imprima lo que tenemos en Local Storage
    })

    vaciarCarritoButton.addEventListener('click', () => {
        arregloCarrito = []; //Reseteamos el carrito
        localStorage.clear(); //Reseteamos el Local Storage
        limpiarHTML(); //Eliminamos todo el HTML
    })
}

function agregarAlbum(e){  
    e.preventDefault();
    if(e.target.classList.contains("card__button")){
        const albumSeleccionado = e.target.parentElement.parentElement;
        leerDatosAlbum(albumSeleccionado); 
    }  
}

function eliminarAlbum(e){
    if(e.target.classList.contains("borrar-album")){
        const albumId = e.target.getAttribute("data-id");
        const album = arregloCarrito.find(album => album.id === albumId);

        const cantidad = album.cantidad;

        if(cantidad > 1){
            const albumes = arregloCarrito.map( album => {
            
                if(album.id === albumId){
                    album.cantidad--;
                    return album;
                }else{
                    return album;
                }
    
            }); 
            arregloCarrito = [...albumes];
            carritoHTML();
        }else{
            arregloCarrito  = arregloCarrito.filter( album => album.id !== albumId);
        } 
        carritoHTML();
    }
}

function leerDatosAlbum(album){
    const infoAlbum = {
        imagen: album.querySelector("img").src,
        titulo: album.querySelector(".card__titulo-album").textContent,
        autor: album.querySelector(".card__autor").textContent.slice(7),
        fecha: album.querySelector(".card__fecha").textContent.slice(6),
        id: album.querySelector(".card__button").getAttribute("data-id"),
        cantidad: 1
    }
    const existe = arregloCarrito.some( album => album.id === infoAlbum.id);

    if(existe){
        const albumes = arregloCarrito.map( album => {
            
            if(album.id === infoAlbum.id){
                album.cantidad++;
                return album;
            }else{
                return album;
            }
        });
        arregloCarrito = [...albumes];
    }else{
        arregloCarrito = [...arregloCarrito, infoAlbum];
    }
    console.log(arregloCarrito);
    carritoHTML();
}

function carritoHTML(){

    limpiarHTML();

    arregloCarrito.forEach( album => {

        const {imagen, titulo, autor, cantidad, id} = album;

        const row = document.createElement("tr");
        row.classList.add("carrito-row");
        row.innerHTML = `
            <td>
               <img class="img_carrito" src="${imagen}" width="100">
            </td>
            <td> ${titulo} </td>
            <td> ${autor} </td>
            <td> ${cantidad} </td>
            <td> 
                <a class="borrar-album" data-id="${id}">X</a> 
            </td>      
        `;
         
        listaCarrito.appendChild(row);        
    });

    //Agregar el carrito de compras al storage
    sincronizarStorage();

}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(arregloCarrito));
}

function limpiarHTML(){
    //Forma lenta
    //listaCarrito.innerHTML = '';

    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}


