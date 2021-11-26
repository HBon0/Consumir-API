document.onload = estaAutenticado();

function estaAutenticado(){
    if(localStorage.getItem("token") != null){
        console.log("autenticado");
    }else{
        document.location.href="../consumir-API/login.html";
    }
}

/* const toggleButton  = document.getElementById('toggle-button');
const navilist = document.getElementById('navi-list'); */

const cerrarSesion = document.getElementById('cerrarSesion-button');

/* toggleButton.addEventListener('click', ()=>{
    navilist.classList.toggle('active');
}); */

cerrarSesion.addEventListener('click',()=>{
    localStorage.removeItem('token');
    document.location.href="../consumir-API/login.html";
});