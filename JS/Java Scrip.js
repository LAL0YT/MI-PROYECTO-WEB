const url = "https://raw.githubusercontent.com/LAL0YT/API-Top-10/master/canciones.json"

fetch(url).then(function(respuesta){
    return respuesta.json();
}).then(function(datos){
    console.log(datos);
}).catch(function(error){
})