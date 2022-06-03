import React, {Fragment} from 'react';

export default function Dato({registro,delete:d}) {
    const {docID,categoria,descripcion,fecha,servicio,ubicacion,userEmail} = registro; 
    const borrar=()=>{
   d(docID);
    };
   
  return (
    
    <tr>
       <td>{categoria}</td>
       <td>{servicio}</td>
       <td>{ubicacion}</td>
       <td>{descripcion}</td>
       <td>{fecha}</td>
       <td><button onClick={borrar} className='btn btn-danger'>Eliminar</button></td>
    </tr>
   
  )
  
}
