import { useEffect, useState } from 'react';
import { createEmployee, searchEmployee, updateEmployee, deleteEmployee } from '../../Services/Employee';

const Employees = (props) => {

    const [employeeData, setEmployeeData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitErrors, setSubmitErrors] = useState();
    const [submitsuccess, setSubmitSuccess] = useState ();
    const [itemOnEdit, setItemOnEdit] = useState(null);
 
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        let rsp = await createEmployee(employeeData);

        if (rsp?.statusCode == 200){            
            loadTableData();
            setSubmitSuccess("Se Creo el Empleado correctamente");
            setEmployeeData(initialState);
        }            
        if (rsp?.status === 400 && rsp.errors) {            
            let errorMessages = Object.values(rsp.errors)
                .flat()
                .join(' ');

            setSubmitErrors(errorMessages);
        }

        if (rsp?.statusCode === 500) {
            
            let error = "El nombre de usuario ya existe o no es valido. " + rsp.message;
            setSubmitErrors(error);
        }

        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');

            window.location.replace('/logout') 
        }
        setLoading(false);   
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(itemOnEdit.code_Employee);            
        let rsp = await updateEmployee(itemOnEdit.id, itemOnEdit);                
        if (rsp?.statusCode == 200){
            loadTableData();            
            setItemOnEdit(null);
            setSubmitSuccess("Se modifico Correctamente el empleado");
            setEmployeeData(initialState);
        }
        
        else if (rsp?.status == 400){
            let errorMessages = Object.values(rsp.errors)
                .flat()
                .join(' ');

            setSubmitErrors(errorMessages);                
        }else if(rsp?.statusCode === 500){
            let error = "El codigo de empleado ya existe o no es valido. " + rsp.message;
            setSubmitErrors(error);
        } 
        
        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/logout')  
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
        if (rsp?.statusCode == 200){
            setTableData(rsp.response);
        } else {
            window.alert('No se pudo cargar la informacion. Inicie sesion nuevamente.');
            window.location.replace('/login') 
        }
    }

    const hideItem = async (code_Employee) => {
        let rsp = await deleteEmployee(code_Employee);

        if (rsp?.statusCode == 200){
            loadTableData();            
            setSubmitSuccess("Se Elimino Correctamente el empleado");
            setEmployeeData(initialState);
        }
        
        else if (rsp?.status == 400){
            let errorMessages = Object.values(rsp.errors)
                .flat()
                .join(' ');

            setSubmitErrors(errorMessages);                
        }else if(rsp?.statusCode === 500){
            let error = "El codigo de empleado no es valido. " + rsp.message;
            setSubmitErrors(error);
        } 
        
        if(rsp instanceof TypeError){
            window.alert('No se pudo cargar la informacion Inicie sesion nuevamente');
            window.location.replace('/logout')  
        }
    }

    useEffect( () => {
        loadTableData();
    }, [])

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setSubmitSuccess("");
            setSubmitErrors("");
        }, 4000);  // Limpiar mensajes después de 5 segundos
    
        return () => clearTimeout(clearMessages);
    }, [submitErrors, submitsuccess]);

    return (
        <>
            <div className="row py-5">
                <div className="col">
                    <h3 className="text-center mb-4">Empleados</h3>
                    <div className="card">
                        <div className="card-body">
                            {
                                itemOnEdit === null ? (
                                    <>
                                        <h5 className="card-title mb-4">Nuevo Empleado</h5>
                                        <form onSubmit={handleSubmit} className="form-inline">
                                            <label className="sr-only" >Nombre</label>
                                            <input onChange={(e) => setEmployeeData({...employeeData, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Empleado" value={employeeData.name} disabled={loading}/>

                                            <label className="sr-only" >Apellido</label>                                                                  
                                            <input onChange={(e) => setEmployeeData({...employeeData, lastName: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Apellido" value={employeeData.lastName} disabled={loading}/>      

                                            <label className="sr-only" >Dni</label>                                                                  
                                            <input onChange={(e) => setEmployeeData({...employeeData, dni: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="DNI" value={employeeData.dni} disabled={loading}/>

                                            <label className="sr-only" >Codigo de empleado</label>                                                                  
                                            <input onChange={(e) => setEmployeeData({...employeeData, code_Employee: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Codigo de Empleado" value={employeeData.code_Employee} disabled={loading}/>                                                        

                                            <button type="submit" className="btn btn-success mb-2" disabled={loading}>+</button>
                                        </form>
                                    </>                                    
                                ) : (
                                    <>
                                        <h5 className="card-title mb-4">Editar Empleado</h5>
                                        <form onSubmit={handleEdit} className="form-inline">
                                            <label className="sr-only" >Cambiar nombre</label>
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" value={itemOnEdit.name} placeholder={itemOnEdit.name} disabled={loading}/>

                                            <label className="sr-only" >Cambiar Apellido</label>                                                                  
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, lastName: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" value={itemOnEdit.lastName} placeholder={itemOnEdit.lastName} disabled={loading}/>      

                                            <label className="sr-only" >Cambiar DNI</label>                                                                  
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, dni: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" value={itemOnEdit.dni} placeholder={itemOnEdit.dni} disabled={loading}/>

                                            <label className="sr-only" >Cambiar Codigo de empleado</label>                                                                  
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, code_Employee: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" value={itemOnEdit.code_Employee} placeholder={itemOnEdit.code_Employee} disabled={loading}/>                                                        

                                            <button type="submit" className="btn btn-success btn-sm mr-2" disabled={loading}>Aceptar <i className="bi bi-check2"></i></button>
                                            <button onClick={() => setItemOnEdit(null)} type="button" className="btn btn-danger btn-sm" disabled={loading}>Cancelar <i className="bi bi-x-lg"></i></button>
                                        </form>
                                    </>
                                )
                            }
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
                                        <th>Apellido</th>
                                        <th>Dni</th>
                                        <th>Codigo de empleado</th>                                        
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tableData.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.lastName}</td>
                                                    <td>{item.dni}</td>
                                                    <td>{item.code_Employee}</td>
                                                    <td>
                                                        <button onClick={() => setItemOnEdit(item)} className="btn btn-sm btn-info mr-2"><i className="bi bi-pencil-square"></i></button>
                                                        <button onClick={() => hideItem(item.code_Employee)} className="btn btn-sm btn-dark"><i className="bi bi-eye-slash"></i></button>
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