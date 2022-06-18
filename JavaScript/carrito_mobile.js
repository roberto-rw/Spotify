let carritoMob = JSON.parse(localStorage.getItem('carrito'));
const listaCarritoMob = document.querySelector('.nav__link_lista_carrito tbody')
const carritoContenedor = document.querySelector(".nav__link_carrito");

console.log(carritoMob);

cargarEventsListenersMob();

function cargarEventsListenersMob(){
    carritoHTMLMob();

    //Elimina albums del carrito
    carritoContenedor.addEventListener('click', eliminarAlbumMob);
}


function carritoHTMLMob(){

    limpiarHTMLMob();

    carritoMob.forEach( album => {

        const {imagen, titulo, autor, cantidad, id} = album;

        const rowMob = document.createElement("tr");
        rowMob.classList.add("carrito-row");
        rowMob.innerHTML = `
            <td>
               <img src="${imagen}" width="100">
            </td>
            <td> ${titulo} </td>
            <td> ${cantidad} </td>
            <td> 
                <a class="borrar-album_mobile" data-id="${id}">X</a> 
            </td>      
        `;
         
        listaCarritoMob.appendChild(rowMob);        
    });

    //Agregar el carrito de compras al storage
    sincronizarStorage();

}

function eliminarAlbumMob(e){
    if(e.target.classList.contains("borrar-album_mobile")){
        const albumId = e.target.getAttribute("data-id");
        const album = carritoMob.find(album => album.id === albumId);

        const cantidad = album.cantidad;

        if(cantidad > 1){
            const albumes = carritoMob.map( album => {
            
                if(album.id === albumId){
                    album.cantidad--;
                    return album;
                }else{
                    return album;
                }
    
            }); 
            carritoMob = [...albumes];
            carritoHTMLMob();
        }else{
            carritoMob  = carritoMob.filter( album => album.id !== albumId);
        } 
        carritoHTMLMob();
    }
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(carritoMob));
}


function limpiarHTMLMob(){
    //Forma lenta
    //listaCarrito.innerHTML = '';

    while(listaCarritoMob.firstChild){
        listaCarritoMob.removeChild(listaCarritoMob.firstChild);
    }
}