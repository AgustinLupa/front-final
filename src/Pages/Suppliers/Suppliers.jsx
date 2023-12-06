import { useEffect, useState } from 'react';
import { create, edit, hide, list } from '../../Services/Suppliers';

const Suppliers = (props) => {

    const defInputValue = {
        name: '',
        address: '',
        phone: 0
    }

    const [supplierData, setSupplierData] = useState(defInputValue);
    const [tableData, setTableData] = useState([]);
    const [submitErrors, setSubmitErrors] = useState([]);
    const [submitMessage, setSubmitMessage] = useState();
    const [itemOnEdit, setItemOnEdit] = useState(null);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let rsp = await create(supplierData);
        if (rsp?.statusCode == 200){
            loadTableData();
            setSubmitMessage(rsp.message);
        }            
        else if (rsp?.status == 400) {
            console.log(rsp.errors);
            setSubmitErrors(rsp.errors);
            console.log(submitErrors);
        }
        else {
            window.alert('No se pudo cargar la informacion. Inicie sesion nuevamente');
            window.location.replace('/logout');
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        if (itemOnEdit.address === undefined)
            itemOnEdit.address= itemOnEdit.adress;        
        let rsp = await edit(itemOnEdit);        
        console.log(rsp);
        if (rsp?.statusCode == 200){
            loadTableData();            
            setItemOnEdit(null);
        }
        else if (rsp?.status == 400){
            loadTableData();
        }            
        else {
            window.alert('No se pudo cargar la informacion. Inicie sesion nuevamente');
            window.location.replace('/logout');
        }
    }

    const loadTableData = async () => {
        let rsp = await list();      
        if (rsp?.statusCode == 200){
            setTableData(rsp.response);
        } else {
            window.alert('No se pudo cargar la informacion. Inicie sesion nuevamente.');
            window.location.replace('/logout');
        }
    }

    const hideItem = async (id) => {
        let rsp = await hide(id);
        if (rsp?.statusCode == 200){
            loadTableData();
        }
        else if (rsp?.statusCode == 404){
            window.alert('No se encontro el proveedor.');
            loadTableData();
        }
        else {
            window.alert('No se pudo cargar la informacion. Inicie sesion nuevamente.');
            window.location.replace('/logout');
        }
    }

    useEffect( () => {
        loadTableData();
    }, [])

    useEffect(() => {
        const clearMessages = setTimeout(() => {
            setSubmitMessage();
            setSubmitErrors([]);
        }, 4000);  // Limpiar mensajes después de 4 segundos
    
        return () => clearTimeout(clearMessages);
    }, [submitErrors, submitMessage]);

    return (
        <>
            <div className="row py-5">
                <div className="col">
                    <h3 className="text-center mb-4">Proveedores</h3>
                    <div className="card">
                        <div className="card-body">
                            {
                                itemOnEdit === null ? (
                                    <>
                                        <h5 className="card-title mb-4">Nuevo proveedor</h5>
                                        <form onSubmit={handleSubmit} className="form-inline">
                                            <label className="sr-only" >Proveedor</label>
                                            <input onChange={(e) => setSupplierData({...supplierData, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" value={supplierData.name} placeholder='Nombre'/>

                                            <label className="sr-only" >Direccion</label>                                                                  
                                            <input onChange={(e) => setSupplierData({...supplierData, address: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" value={supplierData.address} placeholder='Direccion'/>      

                                            <label className="sr-only" >Telefono</label>                                                                  
                                            <input onChange={(e) => setSupplierData({...supplierData, phone: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" value={supplierData.phone} placeholder='N° Telefono'/>                                                        

                                            <button type="submit" className="btn btn-success mb-2">+</button>
                                        </form>
                                    </>                                    
                                ) : (
                                    <>
                                        <h5 className="card-title mb-4">Editar proveedor</h5>
                                        <form onSubmit={handleEdit} className="form-inline">
                                            <label className="sr-only" >Cambiar nombre</label>
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" value={itemOnEdit.name} placeholder={itemOnEdit.name}/>

                                            <label className="sr-only" >Cambiar direccion</label>                                                                  
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, address: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" value={itemOnEdit.adress} placeholder={itemOnEdit.adress}/>      

                                            <label className="sr-only" >Cambiar telefono</label>                                                                  
                                            <input onChange={(e) => setItemOnEdit({...itemOnEdit, phone: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" value={itemOnEdit.phone} placeholder={itemOnEdit.phone}/>                                                        

                                            <button type="submit" className="btn btn-success btn-sm mr-2">Aceptar <i className="bi bi-check2"></i></button>
                                            <button onClick={() => setItemOnEdit(null)} type="button" className="btn btn-danger btn-sm">Cancelar <i className="bi bi-x-lg"></i></button>
                                        </form>
                                    </>
                                )
                            }
                            { submitErrors.length > 0 && (
                                <div className="alert alert-danger">
                                    { submitErrors.map( (item, index) => {
                                        return (
                                            <p key={index}>{item.map( (error) => error)}</p>
                                        )
                                    })}
                                </div>
                            )}
                            { submitMessage && (
                                <div className="alert alert-info">
                                    <p>{submitMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Lista de proveedores</h5>
                            <table className="table">
                                <thead className='thead-dark'>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Direccion</th>
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
                                                    <td>{item.adress}</td>
                                                    <td>{item.phone}</td>
                                                    <td>
                                                        <button onClick={() => setItemOnEdit(item)} className="btn btn-sm btn-info mr-2"><i className="bi bi-pencil-square"></i></button>
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

export default Suppliers;