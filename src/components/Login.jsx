import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom"; 
import cuc from '../images/logocuc.png';
import Swal from "sweetalert2";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 
  const verificar = () => {
   
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

    Login();
  }
  
   const Login =  React.useCallback(async()=>{
     try {
       const response = await auth.signInWithEmailAndPassword(email,password);
       setEmail('');
       setPassword('');
       navigate('/inicio')
     } catch (error) {
       if(error.code ==='auth/wrong-password'){
         messeg('contraseña incorrecta')
       }else if(error.code ==='auth/user-not-found'){
        messeg('usuario no registrado')
       }
       console.log(error)
     }
   },[email,password])

   


  const messeg = (dato) => {
    Swal.fire({
      position: 'center',
      icon: 'error',
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
                <Link to="/login" className="nav-link active bg-danger" ><b>Login</b></Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to="/register" className="nav-link text-danger " ><b>Register</b></Link>
              </li>
            </ul>
            <form>
              <div className="form-outline mb-4">
                <input type="email" id="correo" className="form-control form-control-lg" placeholder='Correo' onChange={(e) => setEmail(e.target.value)} />
                <label className="form-label" htmlFor="correo">Correo</label>
              </div>


              <div className="form-outline mb-4">
                <input type="password" id="Contraseña" className="form-control form-control-lg" placeholder='Contraseña'  onChange={(e) => setPassword(e.target.value)}/>
                <label className="form-label" htmlFor="Contraseña">Contraseña</label>
              </div>
              <div className="d-grid gap-2">
                <button type='button' onClick={verificar} className="btn btn-danger btn-block mb-4">Sign in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
