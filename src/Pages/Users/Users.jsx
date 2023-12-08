import { useEffect,useState } from "react";
import {deleteUser, searchUsers } from "../../Services/Users";
import { createUser } from "../../Services/Users";

const Users = (props) => {
    const defInputValue = {
        username: '',
        password: '',
        id_role: 1
    }

    const [tableInfo, setTableInfo] = useState([]);
    const [action, setAction] = useState(false);
    const [formData, setFormData] = useState(defInputValue);
    const [anyerror, setAnyerror] = useState("");
    const [response, setResponse] = useState("");

    

    const loadTableData = async () => {        
        let rsp = await searchUsers();                  
        setTableInfo(rsp);                            
    }

    const isLogged= () => {
        if(localStorage.getItem('user') != null){
            loadTableData();            
        }else{
            window.replace.location("/login")
        }
    }

    useEffect(() => {        
        isLogged();
    }, [action]);

    let createuser = async (e) => {
        e.preventDefault();
            
        let rsp = await createUser(formData);
                           
        if (rsp) {
            setResponse("Se creo el Usuario con Exito!.");
            isLogged();
            e.target.reset();
            setFormData(defInputValue);
        }else {
            setAnyerror("No se pudo crear el usuario")
        }                        
    }

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setAnyerror("");
            setResponse("");
        }, 4000);  // Limpiar mensajes después de 5 segundos
    
        return () => clearTimeout(clearMessages);
    }, [anyerror, response]);
    

    const handleDelete = async (id) => {
        let rsp = await deleteUser(id);   
        if (rsp){
            loadTableData();     
        }    
    }

       
    

    return (
        <>
            <div className="row py-5">
                <div className="col"> 
                    <h3 className="text-center mb-4">Usuarios</h3>
                    <div className="card">
                        <div className="card-body">                                                                                                 
                            <h4 className="mb-4">Crear Usuario</h4>
                            <form className="form-inline" onSubmit={createuser} id="user-form">
                                <label className="sr-only" >Nombre de Usuario</label>
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Usuario" onChange={e => setFormData({...formData, name: e.target.value})}/>

                                <label className="sr-only" >Clave</label>                                                                  
                                <input type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Clave" onChange={e => setFormData({...formData, password: e.target.value})}/>                                
                                                                            
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
                                    <th scope="col">&nbsp;</th>        
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableInfo.map((user, index) => (
                                        <tr key={index}>
                                        <td>{user.name}</td>
                                        <td>{user.id_Role === 2 ? 'Admin' : 'Usuario'}</td>
                                        <td>                                            
                                            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-dark"><i className="bi bi-eye-slash"></i></button>
                                        </td>
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