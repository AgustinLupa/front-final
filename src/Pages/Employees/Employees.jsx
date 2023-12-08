import { useEffect, useState } from 'react';
import { createEmployee, searchEmployee, deleteEmployee } from '../../Services/Employee';

const Employees = (props) => {

    const [employeeData, setEmployeeData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitErrors, setSubmitErrors] = useState();
    const [submitsuccess, setSubmitSuccess] = useState ();    
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        let rsp = await createEmployee(employeeData);

        if (rsp){            
            loadTableData();
            setSubmitSuccess("Se Creo el Empleado correctamente");
            setEmployeeData(initialState);
        }else{
            setSubmitErrors("No se pudo crear el empleado");
        }                    
        setLoading(false);   
    }
    

    const initialState = {
        name: '',
        lastName: '',
        dni: '',
        code_Employee: '',
    };

    const loadTableData = async () => {
        let rsp = await searchEmployee();        
        if (rsp){
            setTableData(rsp);
        }

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
    }, []);

    const hideItem = async (code_Employee) => {
        let rsp = await deleteEmployee(code_Employee);

        if (rsp){
            loadTableData();            
            setSubmitSuccess("Se Elimino Correctamente el empleado");
            setEmployeeData(initialState);
        }else{
            setSubmitErrors("No se pudo eliminar el Empleado");
        }                
    }    

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setSubmitSuccess("");
            setSubmitErrors("");
        }, 4000);  // Limpiar mensajes después de 4 segundos
    
        return () => clearTimeout(clearMessages);
    }, [submitErrors, submitsuccess]);

    return (
        <>
            <div className="row py-5">
                <div className="col">
                    <h3 className="text-center mb-4">Empleados</h3>
                    <div className="card">
                        <div className="card-body">
                                                                
                            <h5 className="card-title mb-4">Nuevo Empleado</h5>
                            <form onSubmit={handleSubmit} className="form-inline">
                                <label className="sr-only" >Nombre</label>
                                <input onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Empleado" value={employeeData.name} disabled={loading}/>

                                <label className="sr-only" >email</label>                                                                  
                                <input onChange={(e) => setEmployeeData({...employeeData, email: e.target.value})} type="email" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Apellido" value={employeeData.lastName} disabled={loading}/>    
                                <label className="sr-only" >Dni</label>                                                                  
                                <input onChange={(e) => setEmployeeData({...employeeData, phone: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="DNI" value={employeeData.dni} disabled={loading}/>
                                                                                      
                                <button type="submit" className="btn btn-success mb-2" disabled={loading}>+</button>
                            </form>                                                                                                                                                                                
                            {submitErrors? <div className="text-danger mt-3">{submitErrors}</div> : <div className="text-success mt-3">{submitsuccess}</div> }
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Lista de empleados</h5>
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nombre</th>                                       
                                        <th>Email</th>
                                        <th>Telefono</th>                                        
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>                                                    
                                                    <td>                                                        
                                                        <button onClick={() => hideItem(item.id)} className="btn btn-sm btn-dark"><i className="bi bi-eye-slash"></i></button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                
            </div>

        </>
        
    );
}

export default Employees;