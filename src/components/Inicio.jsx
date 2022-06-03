import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import {Link} from "react-router-dom"; 
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
export default function Inicio() {

  const [categoria, setCategoria] = useState("MATENIMIENTO INMUEBLES");
  const [servicios, setServicios] = useState([{ id: 1, name: "baño" }, { id: 2, name: "cielo razo" }, { id: 3, name: "Electrico" }, { id: 4, name: "Pared" }, { id: 5, name: "Puerta" }]);
  const [service, setService] = useState('');
  const [user, setUser] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();
  
  useEffect(()=>{
    if (auth.currentUser) {
      setUser(auth.currentUser);
    }else{
      navigate('/')
    }
  },[navigate])
  
  useEffect(() => {
    changeService()
  }, [categoria]);
       

  const changeService = () => {

    switch (categoria) {
      case "MATENIMIENTO INMUEBLES":
        const lista = [{ id: 1, name: "baño" }, { id: 2, name: "cielo razo" }, { id: 3, name: "Electrico" }, { id: 4, name: "Pared" }, { id: 5, name: "Puerta" }]
        setServicios(lista)
        setService("baño")
        break;

      case "MATENIMIENTO MUEBLES":
        const lista2 = [{ id: 1, name: "Aire acondicionado" }, { id: 2, name: "Archivador" }, { id: 3, name: "Puesto de trabajo" }, { id: 4, name: "Silla" }]
        setServicios(lista2)
        setService("Aire acondicionado")
        break;

      case "SERVICIOS":
        const lista3 = [{ id: 1, name: "Aseo" }, { id: 2, name: "Transporte" }, { id: 3, name: "Vigilancia" }]
        setServicios(lista3)
        setService("Aseo")
        break;

      default:
        break;
    }
  }


  const guardar = () => {
    if (!ubicacion.trim()) {
      messeg('la ubicacion  es obligatoria')
      return
    }
    if (!descripcion.trim()) {
      messeg('la descripcion  es obligatoria')
      return
    }
    enviarDatos(); 
  }
  const enviarDatos =async  ()=>{

    const date = new Date().toISOString().split('T')[0];
    try {
      const nuevoRegistro = {
        categoria: categoria,
        descripcion: descripcion,
        fecha: date,
        servicio: service,
        ubicacion: ubicacion,
        userEmail: user.email
      }
      const dato = await db.collection('peticiones').add(nuevoRegistro)
      messegGood('peticion enviada');
  document.getElementById('ubicacion').value = "";
  document.getElementById('descripcion').value = "";
  setUbicacion('');
  setDescripcion('');
    } catch (error) {
      
    }
  }
  const cancelar = ()=>{
  document.getElementById('ubicacion').value = "";
  document.getElementById('descripcion').value = "";
  setUbicacion('');
  setDescripcion('');

  }
  const cerrarSesion = ()=>{
    Swal.fire({
      title: 'Estas seguro?',
      text: "Estas apunto de salir",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        auth.signOut().then(()=>{
          navigate('/')
        })
      }
    })
  
  }
  const messegGood = (dato)=>{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: dato + "!",
      showConfirmButton: false,
      timer: 700
    })
  }

  const messeg = (dato) => {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: dato ,
      showConfirmButton: false,
      timer: 700
    })
  }
  return (
    <section className="text-center">
      <div className='cierre'>
        <button onClick={cerrarSesion} className="btn-cierre"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="" fill="currentColor" className="bi bi-x-octagon-fill" viewBox="0 0 16 16">
          <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
        </svg></button>

      </div>
      <div className="p-5 bg-image fondo"></div>


      <div className=" inicio card mx-4 mx-md-5 shadow-5-strong">
        <div className="card-body py-5 px-md-5">
          <div className='col-lg-12 consultar'>
            <Link to="/peticiones" className="btn btn-outline-info" ><b>Consultar</b></Link>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-lg-8">

              <h2 className="fw-bold mb-5">Crear Solicitud</h2>
              <form >


                <div className="form-outline mb-4">
                  <label className="form-label">CATEGORIAS</label>
                  <select id='categoria' className='form-select' aria-label='Defoult select example' onChange={(e) => setCategoria(e.target.value)}>
                    <option id='MATENIMIENTO INMUEBLES' value="MATENIMIENTO INMUEBLES">MATENIMIENTO INMUEBLES</option>
                    <option value="MATENIMIENTO MUEBLES">MATENIMIENTO MUEBLES</option>
                    <option value="SERVICIOS">SERVICIOS</option>
                  </select>
                </div>


                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4">SERVICIO</label>
                  <select id='servicio' className='form-select' aria-label='Defoult select example' onChange={(e) => setService(e.target.value)}>
                    {
                      servicios.map((serv) => (
                        <option key={serv.id}>{serv.name}</option>
                      ))}
                  </select>
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" >UBICACION</label>
                  <input id='ubicacion' type="text" className="form-control" onChange={(e) => setUbicacion(e.target.value)} />
                </div>


                <div className="form mb-4">
                  <textarea id="descripcion" className="form-label" rows="5" cols="80" onChange={(e) => setDescripcion(e.target.value)} ></textarea>
                </div>





              </form>
              <button onClick={cancelar} className="btn btn-danger btn-block mb-4 cancelar">
                Cancelar
              </button>
              <button onClick={guardar} className="btn btn-primary btn-block mb-4">
                Enviar
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
