
import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";
import {Link} from "react-router-dom"; 
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Dato from './Dato';
export default function TablaPeticiones() {

const navigate = useNavigate();
const [user, setUser] = useState('');
const [lista, setLista] = useState([]);
const [cargando,setCargando] = useState(true)
useEffect(()=>{
    if (auth.currentUser) {
      setUser(auth.currentUser);
     
    }else{
      navigate('/login')
    }
  },[navigate])

  useEffect(()=>{
obtenerDatos();
  },[lista])

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
          navigate('FirebaseCrud/')
        })
      }
    })
  
  }
  const obtenerDatos = async () => {//llamar a los documentos
    try {
        const data = await db.collection('peticiones').get()
        const Data =
            data.docs.map(doc => ({ docID: doc.id, ...doc.data() }))
        const arrayData = Data.filter((element)=> element.userEmail == user.email)
        setLista(arrayData)
        setCargando(false)
    } catch (error) {
        console.log(error);
    }
}
const eliminarDato = (id)=>{
    try {
         db.collection('peticiones').doc(id).delete()
        const listaFiltrada = lista.filter((elemento) => elemento.id !== id)
        setLista(listaFiltrada)
    } catch (error) {
        console.log(error);
    }
    setCargando(true)
    obtenerDatos();
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
      <div className='col-lg-12 volver'>
      <Link to="/inicio" className="btn btn-outline-danger" ><b>Volver</b></Link>
        </div>
        <div className="row d-flex justify-content-left">
          <div className="col-lg-12">
            <h2 className="fw-bold mb-5">Solicitudes</h2>
            <table className="table table-striped">
                      <thead className=''>
                          <tr>
                              <th>CATEGORIA</th>
                              <th>SERVICIO</th>
                              <th>UBICACION</th>
                              <th>DESCRIPCION</th>
                              <th>FECHA</th>
                              <th>ELIMINAR</th>
                          </tr>
                      </thead>
                      <tbody>

                      {!cargando ?  lista.map((lis) => (
                                    <Dato key={lis.docID} registro={lis} delete={eliminarDato} ></Dato>
                                )): <div></div>}

                      </tbody>
                  </table>
                  {cargando ? <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                  </div> : <div></div>}

          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
