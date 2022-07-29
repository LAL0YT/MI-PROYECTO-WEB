const uri = "https://raw.githubusercontent.com/LAL0YT/API-Top-10/master/";
const el_play_stop = document.querySelector("#play-stop")
const top_contenedor = document.querySelectorAll(".cancion");
const top_contenedores = top_contenedor.length;
const canciones_max = 10;
const posicion_actual = 1;
const la_img = document.querySelector("#imghola");
const nombre = document.querySelector("#nom");
const art = document.querySelector("#nombreart");
const vis = document.querySelector("#millones");
const source = document.querySelector("#musc");
const vol = document.querySelector(".volumen")
function obtener_cancion(posicion){
    return fetch(uri + "canciones.json").then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        return datos[posicion]
    }).catch(function(error){
        console.log(error);
    });
}

function mostrar_actuales(){
    for(let i =0; i <top_contenedores; i++){
        obtener_cancion(posicion_actual + i).then(function(datos){
            let el_imagen = top_contenedor[i].querySelector(".contenedorimg");
            el_imagen.innerHTML = "<div class=iconoplay> <span class=material-symbols-outlined>play_arrow</span></div><yt-imagen><img src="+ uri + datos.imagen +" class=imgcancion id=cancion1></yt-imagen>"
            el_imagen.setAttribute("data-audio", datos.audio);
            el_imagen.addEventListener("click", function() {
                el_play_stop.innerHTML = "pause"
                actualizar_reproductor(datos.imagen, datos.nombre, datos.artista1, datos.visitas);
                source.src = uri + datos.audio;
                audio.load();
                audio.play();
            });
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
function actualizar_reproductor(imagen, nombre, artista1, visitas ) {
    la_img.src = uri + imagen;
    nombre.innerHTML = nombre;
    art.innerHTML = artista1;
    vis.innerHTML = visitas +"M De Visitas";
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
el_play_stop.addEventListener("click", function() {
    if(audio.paused) {
      audio.play();
      el_play_stop.innerHTML = "pause";
    } else {
      audio.pause();
      el_play_stop.innerHTML = "play_arrow";
    }
  });
vol.addEventListener("change", function() {
    audio.volume = el_volumen.value / 100;
  });