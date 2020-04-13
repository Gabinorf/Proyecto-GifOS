/*----------------------------------------------------------
    CARGA DE PANTALLA
-----------------------------------------------------------*/

// Mantiene el TEMA cuando paso de una ventana a otra
function carga (){
    if (sessionStorage.getItem("theme")!==null){
    document.getElementById("theme").href = sessionStorage.getItem("theme");
    }
};
carga();

// Número random de visitas en el header
const M = Math.floor(Math.random() * 100);
const K = Math.floor(Math.random() * 1000);
const n = Math.floor(Math.random() * 1000);
document.getElementsByTagName("h1")[0].innerText +=" "+M+"."+K+"."+n;


/*----------------------------------------------------------
    VARIABLES
-----------------------------------------------------------*/    

const urlTrending = "https://api.giphy.com/v1/gifs/trending?api_key=nGm06uYYj1MsIoIx4FNSmZZ3xSmWZJVQ&limit=25&rating=G",
    urlToday = "https://api.giphy.com/v1/gifs/random?api_key=nGm06uYYj1MsIoIx4FNSmZZ3xSmWZJVQ&tag=&rating=G",
    apiKey = "nGm06uYYj1MsIoIx4FNSmZZ3xSmWZJVQ",
    input = document.getElementById("search");


/*----------------------------------------------------------
    CAMBIO DE TEMAS
-----------------------------------------------------------*/    

function themes(number){
    let elemento = document.getElementById("theme");   
    if(number==1){
        elemento.href ="styles/responsive.css";
        sessionStorage.setItem("theme","styles/responsive.css")
    }
    else{
        elemento.href = "styles/theme"+number+".css";
        sessionStorage.setItem("theme","styles/theme"+number+".css")
    }
};


/*----------------------------------------------------------
    SUGERENCIAS
-----------------------------------------------------------*/       

// Mi lista de sugeridos
const suger = [
    {nombre:"smile", url:"https://media0.giphy.com/media/HyDAt79JnlY4M/giphy.gif?cid=32e0f4a4f166cf7c63d6da9ea5ab26dd6fbf94de82d56852&rid=giphy.gif"},
    {nombre:"think", url:"https://media1.giphy.com/media/d3mlE7uhX8KFgEmY/giphy.gif?cid=32e0f4a46845ddee6995f17e1c007bb28efb1cdf02f547a0&rid=giphy.gif"},
    {nombre:"simpson", url:"https://media2.giphy.com/media/jUwpNzg9IcyrK/giphy.gif?cid=32e0f4a491c7ddc76a377e0d4c64d84565fb9ef4ade418fa&rid=giphy.gif"},
    {nombre:"the mask", url:"https://media1.giphy.com/media/C4dJMJb9SXrc4/giphy.gif?cid=32e0f4a49f4fe09b148e3ebb4a5be25a53b7f3f244a9529a&rid=giphy.gif"},
    {nombre:"van dam", url:"https://media1.giphy.com/media/bd9WihYUUszGE/giphy.gif?cid=32e0f4a4e5eb8454fe7c5cdb526f500a649a97b2c9cfb1ab&rid=giphy.gif"},
    {nombre:"clap", url:"https://media0.giphy.com/media/11OOAQSnUaZT2M/giphy.gif?cid=32e0f4a4cc63643a838d1d86c751d0a834ffe5a42e0c9745&rid=giphy.gif"},
    {nombre:"calculating", url:"https://media2.giphy.com/media/ne3xrYlWtQFtC/giphy.gif?cid=32e0f4a4096fdf5af26feb5ba0cae2f0aa7e3210b6f21ef7&rid=giphy.gif"},
    {nombre:"cats", url:"https://media1.giphy.com/media/ND6xkVPaj8tHO/giphy.gif?cid=32e0f4a4662b14c62cda0a21dff4ccfad189c8c01aae5a7e&rid=giphy.gif"},
    {nombre:"dogs", url:"https://media2.giphy.com/media/101D4JCFeimuzu/giphy.gif?cid=32e0f4a477888a330b9709ce70f8dae5b5f5428cd2e185a2&rid=giphy.gif"},
    {nombre:"dance", url:"https://media1.giphy.com/media/LLHkw7UnvY3Kw/giphy.gif?cid=32e0f4a4213629b5ca894cd4e6552d174882da1d3aef4429&rid=giphy.gif"},
    {nombre:"virus", url:"https://media2.giphy.com/media/TntwwBsTaz9rG/giphy.gif?cid=32e0f4a4c98970e37a681bb734a2ae87f304b6d3d3a0a068&rid=giphy.gif"},
    {nombre:"happy", url:"https://media1.giphy.com/media/iDCLcl7D81aYgLLqyc/giphy.gif?cid=32e0f4a4eeb276f1d4abf71899b7146cdcdea323e71d5f6a&rid=giphy.gif"},
    {nombre:"ronaldo", url:"https://media3.giphy.com/media/r1IMdmkhUcpzy/giphy.gif?cid=32e0f4a4a68c24a60fcd49d118dbd867de55fee9955871da&rid=giphy.gif"},
    {nombre:"fortnite", url:"https://media2.giphy.com/media/65VBy9Ccvyww9or9IR/giphy.gif?cid=32e0f4a49e02c90086f51964de67bcde06a54ef4293ae2b3&rid=giphy.gif"},
];

// Crea el contenido de "Sugerencias" de manera aleatoria
const sugerencias = () => {
    document.getElementsByClassName("content-gifs-2")[0].innerHTML = "";
    for(let i=0; i<4; i++){
        const random = Math.floor(Math.random() * 11);
        document.getElementsByClassName("content-gifs-2")[0].innerHTML += `
            <div class="first">
                <span class="first-title"><p>#${suger[random].nombre}</p><img src="images/close.svg" onclick="cambioSugerencia(${i})" alt="boton cerrar"></span>
                <div class="first-2">
                    <img src="${suger[random].url}"></img>
                    <span class="azul-container azul-position"><a href="#busqueda" onclick="getSearchResults('${suger[random].nombre}')">Ver más...</a></span>
                </div>  
            </div>
        `; 
        suger.splice(random,1);     
    }
};
sugerencias();

// Cierra una sugerencia y me da otra random
const cambioSugerencia = (num) => {
    let hijo = document.getElementsByClassName("first")[num];
    let hijoNuevo = document.createElement("div");
    const random = Math.floor(Math.random() * 11);
    hijoNuevo.classList.add("first");
    hijoNuevo.innerHTML = `
        <span class="first-title"><p>#${suger[random].nombre}</p><img src="images/close.svg" onclick="cambioSugerencia(${num})" alt="boton cerrar"></span>
        <div class="first-2">
            <img src="${suger[random].url}"></img>
            <span class="azul-container azul-position"><a href="#busqueda" onclick="getSearchResults('${suger[random].nombre}')">Ver más...</a></span>
        </div> 
    `;
    document.getElementsByClassName("content-gifs-2")[0].replaceChild(hijoNuevo,hijo);
}


/*-----------------------------------------------------------
    TENDENCIAS
------------------------------------------------------------*/    

//Crea el contenido de "Tendencias" con información de GIPHY
const trendingResults = (data) => {
    let contador = 1;
        document.getElementsByClassName("content-gifs-3")[0].innerHTML ="";    
    for(let i=0; i<data.data.length; i++){
        let largo = data.data[i].images.original.width,
            alto = data.data[i].images.original.height;
        if ( largo>=(2*alto) ){            
            document.getElementsByClassName("content-gifs-3")[0].innerHTML += `
                <div class="second largo${contador}">
                    <img src="${data.data[i].images.original.url}"></img>
                    <span class="bottom"><p>#${data.data[i].title}</p></span>
                </div>
            `;
            contador++;
        }
        else{
            document.getElementsByClassName("content-gifs-3")[0].innerHTML += `
                <div class="second">
                    <img src="${data.data[i].images.original.url}"></img>
                    <span class="bottom"><a href="${data.data[i].url}" target=blank>#${data.data[i].title}</a></span>
                </div>
            `;   
        }    
    }
};

// Obtiene información de GIPHY y llama a la función de construcción
let promise1 = fetch(urlTrending)
.then(response => {
    return response.json()
})
.then(data => {
    trendingResults(data);
})
.catch(error => {
    return error
});


/*-----------------------------------------------------------
    BUSCADOR
------------------------------------------------------------*/    

// Guarda mi búsqueda
const guardarBusqueda = (search) => {
    const save = localStorage.getItem("textoBusqueda");    
    if(save == null){
        localStorage.setItem("textoBusqueda",search);
    }
    else{
        let arrayBusqueda = save.split(",");
        arrayBusqueda.push(search);
            for (i=0; i<arrayBusqueda.length-1; i++){
                if (arrayBusqueda[i] == search) {
                    arrayBusqueda.pop();
                }    
            }    
        localStorage.setItem("textoBusqueda",arrayBusqueda);
    }    
};

// Realiza la busqueda en GIPHY y me muestra los resultados
const getSearchResults = (search) => {   
    document.querySelector("#hidden-results").style.display = "block";
    document.querySelector("#busqueda").innerHTML = search;      
    let  datos = fetch("https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + search + "&limit=25&offset=0&rating=G&lang=en")
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        searchResults(data);
    })  
    .catch(error => {
        return error
    })  
    input.value="";
    document.querySelector(".search-hidden").style.display = "none";
    document.querySelector(".search").setAttribute("disabled","disabled");
    document.querySelector(".search").classList.remove("search-input");
    document.querySelector(".btn-search").classList.remove("btn-search-input");
    document.querySelector(".lupa").classList.remove("lupa-input");
    return datos;  
};

// Me crea un historial de búsquedas realizadas
const historialBusquedas = (search) => {   
    const span = document.createElement("span"),
        a = document.createElement("a");
    span.className = "azul-container";
    a.setAttribute("onclick", "getSearchResults('"+search+"')");
    a.innerText = "#"+search;
    span.appendChild(a);
    document.querySelector(".record").insertBefore(span,document.querySelector(".record").firstElementChild);
};

// Construye los resultados de mi búsqueda
const searchResults = (data) =>{
   let contador = 1;
   document.getElementsByClassName("content-gifs")[0].innerHTML ="";   
   for(let i=0; i<data.data.length; i++){
       let largo = data.data[i].images.original.width,
           alto = data.data[i].images.original.height;
       if ( largo>=(2*alto) ){
            document.getElementsByClassName("content-gifs")[0].innerHTML += `
                <div class="gif-container largo${contador}"><img src="${data.data[i].images.original.url}"></img></div>
                `;
           contador++;
       }
       else{
           document.getElementsByClassName("content-gifs")[0].innerHTML += `
                <div class="gif-container"><img src="${data.data[i].images.original.url}"></img></div>
                `;   
        }    
   } 
};

// Funcionalidad para los resultados de mi historial
let resultadosFiltrar = (param) => {
    historialBusquedas(param);
    getSearchResults(param);
};

// Si mi busqueda ya había sido realizada, la muestra (también resultados similares)
const filtrar = (save) => {
    const arrayBusqueda = save.split(",");
    const resultado =document.getElementsByClassName("search-hidden")[0];
    const texto = input.value.toLowerCase();
    let contador=1; 
    resultado.innerHTML = "";
    for (let i=0; i<arrayBusqueda.length; i++){    
        let elemento = arrayBusqueda[i].toLowerCase();
        if ((elemento.indexOf(texto) !== -1) && (contador<4)) {
            resultado.innerHTML += `
            <li><a href="#busqueda" onclick="resultadosFiltrar('${elemento}')">${elemento}</a></li>
            `;
            document.querySelector(".search-hidden").style.display = "flex";
            contador++;
        }
        if( document.querySelector("#search").value ==""){
            document.querySelector(".search").setAttribute("disabled","disabled");
            document.querySelector(".search").classList.remove("search-input");
            document.querySelector(".btn-search").classList.remove("btn-search-input");
            document.querySelector(".lupa").classList.remove("lupa-input");
            document.querySelector(".search-hidden").style.display = "none";
        }
        if (resultado.innerHTML == "") {
            document.querySelector(".search-hidden").style.display = "none";
        } 
    }
};


/*-----------------------------------------------------------
    EVENTOS
------------------------------------------------------------*/

// BotÓn BUSCAR
document.querySelector(".search").addEventListener("click",()=>{
    const search = input.value;      
    guardarBusqueda(search);
    getSearchResults(search);
    historialBusquedas(search);
});

// Presionar ENTER sobre input
document.getElementById("search").addEventListener("keyup", function(event) {
    // 13 es "Enter" en el teclado
    if (event.keyCode === 13) {
        const search = input.value;      
        guardarBusqueda(search);
        getSearchResults(search);
        historialBusquedas(search);
    }
  });

// Input de texto
document.getElementById("search").addEventListener("keyup", () => {
    document.querySelector(".search").removeAttribute("disabled");
    document.querySelector(".search").classList.add("search-input");
    document.querySelector(".btn-search").classList.add("btn-search-input");
    document.querySelector(".lupa").classList.add("lupa-input");
    let save = localStorage.getItem("textoBusqueda");
    if (save==null){
        if( document.querySelector("#search").value ==""){
            document.querySelector(".search").setAttribute("disabled","disabled");
            document.querySelector(".search").classList.remove("search-input");
            document.querySelector(".btn-search").classList.remove("btn-search-input");
            document.querySelector(".lupa").classList.remove("lupa-input");
            document.querySelector(".search-hidden").style.display = "none";
        }
    }    
    else{
        filtrar(save);
    }    
});

// Botón Elegir Tema
document.querySelector(".llave").addEventListener("click", ()=>{
    if (document.querySelector(".hidden").style.display == "none"){
        document.querySelector(".hidden").style.display = "flex";
    }
    else{
        document.querySelector(".hidden").style.display = "none";
    }
});

// Oculta mis opciones de temas al dar click en el documento
document.addEventListener("click", function(e){
var clic = e.target;
if(document.querySelector(".hidden").style.display == "flex" && clic !=  document.querySelector(".llave") ){
    document.querySelector(".hidden").style.display = "none";
}

});