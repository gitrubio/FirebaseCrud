import React, { useState } from 'react'
import { Link } from "react-router-dom";
import cuc from '../images/logocuc.png';
import { auth } from '../firebase';
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const guardarUsuario = () => {
   
    if (!email.trim()) {
      messeg('el campo email es obligatorio')
      return
    }
    if (!password.trim()) {
      messeg('el campo password es obligatorio')
      return
    } 
    if (password.length<6) {
      messeg('la contraseña debe tener minimo 6 caracteres')
      return
    }
    register();
  }

  const register = React.useCallback(async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password);
      console.log(response.user);
      messegGood('registrado con exito')
      setEmail('');
      setPassword('');
      document.getElementById('Nombre').value='';
      document.getElementById('Apellido').value='';
      document.getElementById('contraseña').value='';
      document.getElementById('Correo').value='';
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        messeg('email invalido')
      }
      if (error.code === 'auth/email-already-in-use') {
        messeg('el email ya esta registrado')
      }
      
    }
  },[email,password])
  
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
      title: dato + "!",
      showConfirmButton: false,
      timer: 700
    })
  }
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img src={cuc}
              className="img-fluid" alt="Phone image" />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li className="nav-item" role="presentation">
                <Link to="/" className="nav-link text-danger" ><b>Login</b></Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to="/register" className="nav-link active bg-danger" ><b>Register</b></Link>
              </li>
            </ul>
            <form>

              <div className="row  mb-2">
                <div className="col-md-6">
                  <div className="form-outline mb-4">
                    <input type="text" id="Nombre" className="form-control" />
                    <label className="form-label" htmlFor="Nombre">Nombre</label>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-outline mb-4 ">
                    <input type="text" id="Apellido" className="form-control" />
                    <label className="form-label" htmlFor="Apellido">Apellido</label>
                  </div>
                </div>
              </div>

              <div className="row  mb-2">
                <div className="col-md-6">
                  <div className="form-outline mb-4">
                    <input type="email" id="Correo" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    <label className="form-label" htmlFor="Correo">Correo*</label>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="form-outline mb-4 ">
                    <input type="password" id="contraseña" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    <label className="form-label" htmlFor="contraseña">contraseña*</label>

                  </div>
                </div>
              </div>
            </form>
            <div className="d-grid gap-2">
              <button type='buttom' onClick={guardarUsuario} className="btn btn-danger btn-block mb-4">Registrar</button>
            </div>

          
          </div>
        </div>
      </div>
    </section>
  )
}
