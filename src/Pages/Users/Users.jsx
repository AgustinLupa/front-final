import { useEffect,useState } from "react";
import {searchUsers, } from "../../Services/Users";
import { Navigate } from 'react-router-dom';
import { createUser } from "../../Services/Users";

const Users = (props) => {
    const [tableInfo, setTableInfo] = useState([]);
    const [action, setAction] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        id_role: 2,
        state: 1,
    });
    const [anyerror, setAnyerror] = useState("");
    const [response, setResponse] = useState("");

    const loadTableData = async () => {        
        let rsp = await searchUsers();          
        if(rsp?.statusCode === 200){
            setTableInfo(rsp.response);
        }
        
        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/logout')  
        }     
        
        /*else{
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/login') 
        }    */                                                                                       
    }

    useEffect(() => {        
        loadTableData();
    }, [action]);

    let createuser = async (e) => {
        e.preventDefault();
            
            let rsp = await createUser(formData);
    
            if (rsp?.status === 400 && rsp.errors) {
                setResponse("");
                let errorMessages = Object.values(rsp.errors)
                    .flat()
                    .join(' ');
    
                setAnyerror(errorMessages);
            }
    
            if (rsp?.statusCode === 500) {
                setAnyerror("");
                let error = "El nombre de usuario ya existe o no es valido. " + rsp.message;
                setAnyerror(error);
            }
    
            if (rsp?.statusCode === 200) {
                setResponse("Se creo el Usuario con Exito!.")
                setAction(true);
            }            

            if(rsp instanceof TypeError){
                window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
                window.location.replace('/logout') 
            }       
    }

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setAnyerror("");
            setResponse("");
        }, 4000);  // Limpiar mensajes después de 5 segundos
    
        return () => clearTimeout(clearMessages);
    }, [anyerror, response]);
    

    return (
        <>
            <div className="row py-5">
                <div className="col"> 
                    <h3 className="text-center mb-4">Usuarios</h3>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-4">Crear Usuario</h4>
                            <form className="form-inline" onSubmit={createuser}>
                                <label className="sr-only" >Nombre de Usuario</label>
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Usuario" onChange={e => setFormData({...formData, username: e.target.value})}/>

                                <label className="sr-only" >Clave</label>                                                                  
                                <input type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Clave" onChange={e => setFormData({...formData, password: e.target.value})}/>                                
                                
                                <div className="form-check form-check-inline ">
                                    <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setFormData({...formData, id_role: 1})}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setFormData({...formData, id_role: 2})} checked/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Usuario</label>
                                </div>
                                <button type="submit" className="btn btn-success mb-2 ml-3">+</button>
                            </form>
                            {anyerror? <div className="text-danger mt-3">{anyerror}</div> : <div className="text-success mt-3">{response}</div> }
                        </div>
                    </div>

                </div>
            </div>

            <div className="row py-5">
                <div className="col">
                    
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Lista de usuarios</h3>
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>                                    
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rol</th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableInfo.map((user, index) => (
                                        <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.id_Role}</td>
                                        </tr>
                                    ))}                                  
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;