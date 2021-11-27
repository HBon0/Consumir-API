
// codigo para modal formulario Modificar
const modal_container_modificar = document.getElementById('modal_container_modificar');

function openModificar(id) {
  modal_container_modificar.classList.add('show')

  this.idRol = id;
}

function closeModificar(){
  modal_container_modificar.classList.remove('show')
}

//----------------Obtener todos los roles-------------------------------------------------------------------------------------------------
const body = document.querySelector("#body");

token = "" + localStorage.getItem("token");
url = localStorage.getItem("urlApi");

var roles;
var idRol;

function GetIndex(){
    fetch(this.url + "Rol",{
        method:'GET',
        headers:{
            "content-type": "application/json",
            "Authorization": "Bearer " + this.token
        }
    })
        .then(res => res.json())
        .then(data => {
            this.roles = data;
            let html = "";
            const N = 0;

            this.roles.forEach(item => {
                const tr = `
                <tr>
                    <td>${item.nombre}</td>
                    <td>
                        <div>
                            <button type="button" data-id="${item.id}" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#modal-cerrar" onclick="Eliminar(${item.id})">🗑 Eliminar</button>
                         </div>
                         <div>   
                            <button type="button" data-id="${item.id}" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modal-modificar" onclick="AbrirModificar(${item.id})">🖉 Editar</button>
                        </div>
                    </td>
                </tr>
                `;
                html += tr;
                
            });
            body.innerHTML = html;
        })
}
//-------------------------------------------Fin Obtener--------------------------------

//-------------Funcion para crear Rol usando Fetch----------------------------------------------------------------------------------------------------
function Crear() { //Creamos una nueva funcion llamada crear la cual obtendra el valor de la caja de Texto en el modal y se la enviara a la funcion CrearRol
    const nombre = document.querySelector('#crear-nombre').value;
    console.log(nombre);
    CrearRol(nombre)
}

function CrearRol(nombre){
    const Rol = {
        nombre: nombre
    }

    fetch(this.url + "Rol", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(Rol), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + this.token
        }
      })
      .then(res => {
          console.log(res);
          if(res.status == 200){
            location.reload()
          }else if(res.status == 401){
            alert('No autorizado');
          }else{
              alert('Ocurrio un error');
              formularioCrear.reset();
          }
      });
}
//-----------------------------Fin Crear------------------------------------------------------------------------------

//---------------Funcion para Modificar Rol usando Fetch--------------------------------------------------------------------------------------------------
var formModificar = document.querySelector("#form-modificar");

function AbrirModificar(id) {
    this.idRol = id;
}

function Modificar() {
    const id = this.idRol;
    const nombre = document.querySelector("#modificar-nombre").value;

    ModificarRol(id, nombre);
}

function ModificarRol(id, nombre){
    const Rol = {
        id: id,
        nombre: nombre
    }

    fetch(this.url + "Rol/" + this.idRol,{
        method: 'PUT', // Indicamos el tipo de Peticion HTTP a realizar
        body: JSON.stringify(Rol), // convertimos a JSON el objeto Rol
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formModificar.reset();
        }
    });
}
//-----------------------Fin Modificar---------------------------------------------------------------------------

//-----------------Funcion para Eliminar Rol usando Fetch------------------------------------------------------------------------
function Eliminar(id) {
    this.idRol = id;
}

function EliminarRol(){
    fetch(this.url + "Rol/" + this.idRol,{
        method: 'DELETE', // Indicamos el tipo de Peticion HTTP a realizar
        headers:{
          'Content-Type': 'application/json', //Especificamos el tipo de contenido a enviar en este caso un JSON
          "Authorization": "Bearer " + this.token //Se anexa la autenticacion Bearer token
        }
      }).then(res => {
        console.log(res);
        if(res.status == 200){
          location.reload()
          console.log("Eliminado");
        }else if(res.status == 401){
          alert('No autorizado');
        }else{
            alert('Ocurrio un error');
            formularioCrear.reset();
        }
    });
} 
// --------------------------------------------------------------------------------------------------------------------