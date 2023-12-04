import { useEffect,useState } from "react";
import {searchUsers, } from "../../Services/Users";
import { Navigate } from 'react-router-dom';

const Users = (props) => {
    const [tableInfo, setTableInfo] = useState([]);
    const [action, setAction] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        id_role: 3,
        state: 1,
    });
    const [anyerror, setAnyerror] = useState("");
    const [response, setResponse] = useState(null);

    const loadTableData = async () => {        
        let rsp = await searchUsers();          
        if(rsp?.statusCode === 200){
            setTableInfo(rsp.response);
        }else{
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/login') 
        }                                                                                           
    }

    useEffect(() => {        
        loadTableData();
    }, [action]);

    let createUser = async () => {
        let rsp= await createUser(formData);
        setResponse(rsp);
        console.log(response);        
        if(rsp?.statusCode === 400){
            let error = rsp.errors.password + " " + rsp.errors.username;
            setAnyerror(error)
            window.alert(error);
        }
        if(rsp?.statusCode === 200){
            setAction(true);
        }                        
        else{
            window.alert('No se pudo crear el usuario correctamente Inicie sesion nuevamente');
            window.location.replace('/login') 
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
                            <form className="form-inline" onSubmit={createUser}>
                                <label className="sr-only" >Nombre de Usuario</label>
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Usuario" onChange={e => setFormData({...formData, username: e.target.value})}/>

                                <label className="sr-only" >Clave</label>                                                                  
                                <input type="password" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Clave" onChange={e => setFormData({...formData, password: e.target.value})}/>                                
                                
                                <div className="form-check form-check-inline ml-4">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" onChange={() => setFormData({...formData, id_role: 2})}/>
                                    <label className="form-check-label" htmlFor="inlineRadio1">Admin</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" onChange={() => setFormData({...formData, id_role: 3})} checked/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Usuario</label>
                                </div>
                                <button type="submit" className="btn btn-success mb-2 ml-3">+</button>
                            </form>
                            {anyerror && <div className="text-danger mt-3">{anyerror}</div>}
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
                                <thead>
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