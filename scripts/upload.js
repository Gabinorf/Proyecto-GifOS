/*----------------------------------------------------------
    CARGA DE PANTALLA
-----------------------------------------------------------*/

// Mantiene el TEMA cuando paso de una ventana a otra
const carga = () => {
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

//Si tengo guifos los carga
const myGuifos = () =>{
    const save = localStorage.getItem("Guifos");
    if(save == null){
        document.getElementById("misguifos").style.display = "none";
    }
    else{
        let arrayGuifos = save.split(",");
        for (i=0; i<arrayGuifos.length; i++){
            let img = document.createElement('img');
            img.src = "https://media1.giphy.com/media/"+arrayGuifos[i]+"/200.gif";
            document.querySelector('.content-gifs-4').appendChild(img);
        }
    }
};
myGuifos();

/*----------------------------------------------------------
    VARIABLES
-----------------------------------------------------------*/

let recorder = null, url = null;
let intervalo;
let form;
let video = document.getElementById("first-video");
const apiKey = "nGm06uYYj1MsIoIx4FNSmZZ3xSmWZJVQ";


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


/*-----------------------------------------------------------
    EVENTOS
------------------------------------------------------------*/

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

 

/*-----------------------------------------------------------
    EVENTOS VENTANA CAPTURER
------------------------------------------------------------*/

// Obtiene video de la cámara
function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { width: 1280, height: 720 }
        })
        .then( stream => {
            video.srcObject = stream;
            video.play();
            
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
            });
        })
    .catch( error => {
        return error
    })
};   

//Botón Comenzar
document.querySelector("#comenzar").addEventListener("click",()=>{
    document.querySelector('.misguifos').style.display = "none";
    getStreamAndRecord();
    setTimeout( function(){
        document.querySelector(".capturer").style.display ="flex";
        document.querySelector(".capture").style.display = "none";
    },1500);    
});




/****************************************************
 EVENTOS VENTANA CAPTURER
 ****************************************************/

// Botón Capturar/Listo
document.querySelector("#btn-listo").addEventListener("click",()=>{
    switch (document.querySelector("#btn-listo").innerText) {
        case "Capturar":
            intervalo = setInterval(timer,1000);
            document.querySelector(".timer").style.display = "flex";
            buttonChanges("Listo");
            recorder.startRecording();
        break;
    
        case "Listo":
            document.querySelector(".inicio").classList.remove("final");
            recorder.stopRecording(function(){
                form = new FormData();
                form.append("file", recorder.getBlob(), "myGif.gif");
            })
            clearInterval(intervalo);
            url = URL.createObjectURL(recorder.getBlob());
            previewChange("image");
            buttonChanges();
            buttonDisplay(1);
        break;
    }
});

// Contador de tiempo al presionar Capturar
let contador_segundos=1;
const timer = () => {
    if (contador_segundos<10){
        document.querySelector("#segundos").innerHTML=contador_segundos;
        contador_segundos++;
    }
    else{
        document.querySelector("#minutos").innerHTML="00:";
        document.querySelector("#segundos").innerHTML=contador_segundos;
        contador_segundos++;
    }    
};

// Muestra u oculta elementos
let buttonDisplay = (state) => {
    if (state==1) {
        document.querySelector("#label-guardar").style.display = "none";
        document.querySelector("#btn-listo").style.display = "none";
        document.querySelector("#guardar").style.display = "block";
        document.querySelector("#cancelar").style.display = "block";
        document.querySelector(".play-gif").style.display = "flex";
    }
    else{
        document.querySelector("#label-guardar").style.display = "flex";
        document.querySelector("#btn-listo").style.display = "block";
        document.querySelector("#guardar").style.display = "none";
        document.querySelector("#cancelar").style.display = "none";
        document.querySelector(".play-gif").style.display = "none";
    }
};

// Muestra video o imagen
let previewChange = (preview) => {
    document.querySelector("#preview").src = url;
    setTimeout(() => {    
        if (preview=="image"){
            document.querySelector("#first-video").style.display = "none";
            document.querySelector("#preview").style.display = "block";
        }
        else{
            document.querySelector("#first-video").style.display = "block";
            document.querySelector("#preview").style.display = "none";
        }    
    },1000);
};

//Cambios del botón Capturar
let buttonChanges = (state) => {
    if (state=="Listo"){
        document.querySelector(".camara").classList.add("recording");
        document.querySelector("#label-guardar").classList.add("label-listo");
        document.querySelector(".btn-captura").classList.add("btn-listo");
        document.querySelector("#btn-listo").innerText=state;
    }
    else{
        document.querySelector(".camara").classList.remove("recording");
        document.querySelector("#label-guardar").classList.remove("label-listo");
        document.querySelector(".btn-captura").classList.remove("btn-listo");
        document.querySelector("#btn-listo").innerText="Capturar";
    }
};

//Resetea el contador
let resetTimer = () => {
    document.querySelector("#segundos").innerHTML="0";
    clearInterval(intervalo);
    contador_segundos=1;
    document.querySelector("#minutos").innerHTML="00:0";
};

//Pasos atrás al reiniciar la captura
let reinicioCaptura = () => {
    document.querySelector(".inicio").classList.remove("final");
    document.querySelector(".timer").style.display = "none";
    document.querySelector(".inicio").classList.remove("final"); 
    buttonChanges();
    getStreamAndRecord();
    previewChange();
    buttonDisplay();
    resetTimer();
};

//Cerrar ventana con Close
document.querySelector("#cerrar").addEventListener("click",()=>{
    document.querySelector(".inicio").classList.remove("final");
    document.querySelector(".capturer").style.display ="none";
    document.querySelector(".capture").style.display = "flex";
    document.querySelector('.misguifos').style.display = "block";   
    if (document.querySelector("#btn-listo").innerText=="Listo"){
        document.querySelector(".timer").style.display = "none";
        buttonChanges();
        recorder.stopRecording();
        resetTimer();
        document.querySelector(".inicio").classList.remove("final");    
    } 
    if(document.querySelector("#guardar").style.display == "none"){
        document.querySelector(".timer").style.display = "none";
        previewChange();
        buttonDisplay();
        resetTimer();
        document.querySelector(".inicio").classList.remove("final"); 
    }
});

//Animación al presionar botón play
document.querySelector(".img-play").addEventListener("click",()=>{
    document.querySelector(".inicio").classList.add("final");
})

// Botón Reiniciar Captura
document.querySelector("#cancelar").addEventListener("click", reinicioCaptura);

//Botón Subir Guifo
document.querySelector("#guardar").addEventListener("click", ()=>{
    reinicioCaptura();
    document.querySelector(".capturer").style.display ="none";
    document.querySelector(".upload").style.display ="flex";
    document.getElementById("inicio").classList.add("final");
    document.querySelector(".inicio").classList.remove("final"); 
    fetch("https://upload.giphy.com/v1/gifs?api_key=" + apiKey, {
        method: "POST",
        body: form
    })
    .then(res => res.json())
    .then(response => {
        guardarGuifo(response.data.id);
        let img = document.createElement('img');
        img.src = "https://media1.giphy.com/media/"+response.data.id+"/200.gif";
        document.getElementById("url").value = img.src;
        document.getElementById("download").href = url;
        document.querySelector(".success-container").innerHTML="";
        document.querySelector('.success-container').appendChild(img);
    })
    .then(delay => {
        if (cancel=="ok"){
            document.querySelector(".upload").style.display ="none";
            document.querySelector('.misguifos').style.display = "block";
            document.querySelector(".capture").style.display = "flex";
            cancelGuifo();
        }
        else{
            document.querySelector(".upload").style.display ="none";
            document.querySelector(".success").style.display ="flex";
            document.querySelector('.misguifos').style.display = "block";
            document.querySelector('.content-gifs-4').appendChild(img);
        }    
    })
    .catch( error => {
        return error
    });
});

//Guarda Guifos en localStorage
const guardarGuifo = (search) => {
    const save = localStorage.getItem("Guifos");    
    if(save == null){
        localStorage.setItem("Guifos",search);
    }
    else{
        let arrayGuifos = save.split(",");
        if(arrayGuifos.length>7){
            arrayGuifos.shift();
            arrayGuifos.push(search);
            for (i=0; i<arrayGuifos.length-1; i++){
                if (arrayGuifos[i] === search) {
                    arrayGuifos.pop();
                }    
            }    
            localStorage.setItem("Guifos",arrayGuifos);
        }
        else{
            let arrayGuifos = save.split(",");
            arrayGuifos.push(search);
                for (i=0; i<arrayGuifos.length-1; i++){
                    if (arrayGuifos[i] === search) {
                        arrayGuifos.pop();
                    }    
                } 
            localStorage.setItem("Guifos",arrayGuifos);
        }    
    }
};

//Borra ultimo Gif guardado en localStorage
const cancelGuifo = () => {
    const save = localStorage.getItem("Guifos");    
    if(save == null){
    }
    else{
        let arrayGuifos = save.split(",");
        if (arrayGuifos.length==1){
            localStorage.removeItem("Guifos");
        }
        else{
            arrayGuifos.pop();  
            localStorage.setItem("Guifos",arrayGuifos);  
        }
    }
    cancel = "";
};

// Bottón cancelar del UPLOAD
let cancel;
document.getElementById("uploadCancel").addEventListener("click", ()=>{
    cancel = "ok";
});

/****************************************************
 EVENTOS VENTANA SUCCESS
 ****************************************************/

//Botón close
document.getElementById("cerrar2").addEventListener("click",()=>{
    document.querySelector(".success").style.display ="none";
    document.querySelector(".capture").style.display = "flex";
});

//Botón Listo
document.getElementById("finish").addEventListener("click",()=>{
    document.querySelector('.content-gifs-4').innerHTML="";
    myGuifos();
    document.querySelector(".success").style.display ="none";
    document.querySelector(".capture").style.display = "flex";
});

//Copia enlace del guifo en portapapeles
function copiar() {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById("url").value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
};

//Botón Copiar Enlace
document.getElementById("url").addEventListener("click",copiar);