import { useEffect,useState } from "react";
import {deleteUser, searchUsers, updateUsers, } from "../../Services/Users";
import { Navigate } from 'react-router-dom';
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
    const [itemOnEdit, setItemOnEdit] = useState(null);
    

    const loadTableData = async () => {        
        let rsp = await searchUsers();          
        if(rsp?.statusCode === 200){
            setTableInfo(rsp.response);
        }
        
        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/logout')  
        }             
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
                setResponse("Se creo el Usuario con Exito!.");
                setAction(true);
                e.target.reset();
                setFormData(defInputValue);
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

    const handleEdit = async (e) => {
        e.preventDefault();      

        if (itemOnEdit.username === undefined)
            itemOnEdit.username= itemOnEdit.name;
        if (itemOnEdit.id_role === undefined)
            itemOnEdit.id_role= itemOnEdit.id_Role;
        
        let rsp = await updateUsers(itemOnEdit);                
        if (rsp?.statusCode == 200){
            loadTableData();            
            setItemOnEdit(defInputValue);            
            setItemOnEdit(null);
        }
        else if (rsp?.status == 400){            
        }            
        e.target.reset();        
    }

    const handleDelete = async (id) => {
        let rsp = await deleteUser(id);   
        if (rsp?.statusCode == 200){
            loadTableData();     
        }
        if (rsp?.statusCode == 404){
            window.alert('No se ha encontrado el usuario que intento eliminar.');
            loadTableData();     
        }
        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/logout') 
        }   
    }

    const cancelEdit = () => {
        setItemOnEdit(null);
        document.getElementById('user-form').reset();
    }

    const editItem = (item) => {
        document.getElementById('user-form').reset();
        setItemOnEdit(item);
    }
    

    return (
        <>
            <div className="row py-5">
                <div className="col"> 
                    <h3 className="text-center mb-4">Usuarios</h3>
                    <div className="card">
                        <div className="card-body">
                            {
                                itemOnEdit === null ? (
                                    <>
                                        <h4 className="mb-4">Crear Usuario</h4>
                                        <form className="form-inline" onSubmit={createuser} id="user-form">
                                            <label className="sr-only" >Nombre de Usuario</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Usuario" onChange={e => setFormData({...formData, username: e.target.value})}/>

                                            <label className="sr-only" >Clave</label>                                                                  
                                            <input type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Clave" onChange={e => setFormData({...formData, password: e.target.value})}/>                                
                                            
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setFormData({...formData, id_role: 1})} checked/>
                                                <label className="form-check-label" htmlFor="inlineRadio1">Usuario</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setFormData({...formData, id_role: 2})}/>
                                                <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
                                            </div>
                                            <button type="submit" className="btn btn-success mb-2 ml-3">+</button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="mb-4">Editar Usuario</h4>
                                        <form className="form-inline" onSubmit={handleEdit} id="user-form">
                                            <label className="sr-only" >Nombre de Usuario</label>
                                            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder={itemOnEdit.name} onChange={e => setFormData({...itemOnEdit, username: e.target.value})}/>
                                        
                                            <div className="form-check form-check-inline ">
                                                <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setFormData({...itemOnEdit, id_role: 1})} checked />
                                                <label className="form-check-label" htmlFor="inlineRadio1">Usuario</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input ml-4" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setFormData({...itemOnEdit, id_role: 2})} />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
                                            </div>
                                            <button type="submit" className="btn btn-success btn-sm mr-2">Aceptar <i className="bi bi-check2"></i></button>
                                            <button onClick={() => cancelEdit()} type="button" className="btn btn-danger btn-sm">Cancelar <i className="bi bi-x-lg"></i></button>
                                        </form>
                                    </>
                                )
                            }                            
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
                                            <button onClick={() => editItem(user)} className="btn btn-sm btn-info mr-2"><i className="bi bi-pencil-square"></i></button>
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