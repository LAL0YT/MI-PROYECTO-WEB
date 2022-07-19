const uri = "https://raw.githubusercontent.com/LAL0YT/API-Top-10/master/";
const top_contenedor = document.querySelectorAll(".cancion");
const top_contenedores = top_contenedor.length;
const canciones_max = 10;
let posicion_actual = 1;
const urlaalbun = document.querySelectorAll("#linkaalbun")
function obtener_cancion(posicion){
    return fetch(uri + "canciones.json").then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        return datos[posicion];
    }).catch(function(error){
        console.log(error);
    });
}
function mostrar_actuales(){
    for(let i =0; i <top_contenedores; i++){
        obtener_cancion(posicion_actual + i).then(function(datos){
            let el_imagen = top_contenedor[i].querySelector("yt-music-imagen-cancion div yt-imagen img");
            el_imagen.src = uri + datos.imagen;
            let el_posicion = top_contenedor[i].querySelector("div div yt-music-posicion");
            el_posicion.innerHTML = datos.posicion;
            let el_nombre = top_contenedor[i].querySelector("div div yt-music-custom-titulo");
            el_nombre.innerHTML = datos.nombre;
            let el_artista = top_contenedor[i].querySelector(".artista");
            el_artista.innerHTML = datos.artista1;
            let el_artista2 = top_contenedor[i].querySelector(".artista2");
            el_artista2.innerHTML = "";
            if(datos.artista2 !=undefined) {
                el_artista2.innerHTML = "<span>y  </span>" + "<a href="+datos.lartista2 + "  target=_blank"+">" + datos.artista2 +"</a>";
            }
            let el_vistas = top_contenedor[i].querySelector(".vistas1");
            el_vistas.innerHTML = datos.visitas +"M De Visitas";
            let el_lartista = top_contenedor[i].querySelector(".artista");
            el_lartista.href = datos.lartista1;
        });
    }
}
mostrar_actuales();
const el_siguiente = document.querySelector(".boton-grupo span:last-child");
const el_anterior = document.querySelector(".boton-grupo span:first-child");

el_siguiente.addEventListener("click", function() {

    if(el_siguiente.classList.contains("desactivado")){
        return;
    }
    posicion_actual++;
    mostrar_actuales();
    if(posicion_actual + top_contenedores > canciones_max){
        el_siguiente.classList.add("desactivado");
    }
    el_anterior.classList.remove("desactivado");
    
});
el_anterior.addEventListener("click", function(){
    if(el_anterior.classList.contains("desactivado")){
        return;
    }
    posicion_actual--;
    mostrar_actuales();
    if(posicion_actual <=1){
        el_anterior.classList.add("desactivado");
    }
    el_siguiente.classList.remove("desactivado");
    
});
