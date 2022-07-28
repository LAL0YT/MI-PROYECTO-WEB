const url = "https://raw.githubusercontent.com/LAL0YT/API-Top-10/master/";
const adelante = document.querySelector("#next");
const audio = document.querySelector("#musc");
const atras = document.querySelector("#next")

function obtener_reproductor(posicion){
    return fetch(url + "DatosReproductor.json").then(function(respuesta){
        return respuesta.json();
    }).then(function(datos){
        return datos[posicion]
    }).catch(function(error){
        console.log(error);
    });
}
