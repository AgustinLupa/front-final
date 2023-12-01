import { useEffect,useState } from "react";
import {searchUsers} from "../../Services/Users";
import { Navigate } from 'react-router-dom';

const Users = (props) => {
    const [tableInfo, setTableInfo] = useState([]);
    const [action, setAction] = useState(false);

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
    }, [action])

    return (
        <>
            <div className="row py-5">
                <div className="col"> 
                    <h3 className="text-center mb-4">Usuarios</h3>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="mb-4">Crear Usuario</h4>
                            <form className="form-inline">
                                <label className="sr-only" >Nombre de Usuario</label>
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Usuario"/>

                                <label className="sr-only" >Clave</label>                                                                  
                                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Clave"/>                                
                                

                                <button type="submit" className="btn btn-success mb-2">+</button>
                            </form>
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