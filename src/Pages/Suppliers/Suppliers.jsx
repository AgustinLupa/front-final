import { useEffect, useState } from 'react';
import { create, list } from '../../Services/Suppliers';

const Suppliers = (props) => {

    const [supplierData, setSupplierData] = useState({});
    const [tableData, setTableData] = useState([]);
    const [submitErrors, setSubmitErrors] = useState([]);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        let rsp = await create(supplierData);
        if (rsp?.statusCode == 200)
            console.log(rsp);
        else {
            console.log(rsp);
        }
    }

    const loadTableData = async () => {
        let rsp = await list();        
        console.log(rsp);
        if (rsp?.statusCode == 200){
            setTableData(rsp.response);
        }
    }

    useEffect( () => {
        loadTableData();
    }, [])

    return (
        <>
            <div className="row py-5">
                <div className="col">
                    <h3 className="text-center mb-4">Proveedores</h3>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-4">Nuevo proveedor</h5>
                            <form onSubmit={handleSubmit} className="form-inline">
                                <label className="sr-only" >Proveedor</label>
                                <input onChange={(e) => setSupplierData({...supplierData, name: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Nombre de Proveedor"/>

                                <label className="sr-only" >Direccion</label>                                                                  
                                <input onChange={(e) => setSupplierData({...supplierData, address: e.target.value})} type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Direccion"/>      

                                <label className="sr-only" >Telefono</label>                                                                  
                                <input onChange={(e) => setSupplierData({...supplierData, phone: e.target.value})} type="number" className="form-control mb-2 mr-sm-2" id="inlineFormInputGroupUsername2" placeholder="Telefono"/>                                                        

                                <button type="submit" className="btn btn-success mb-2">+</button>
                            </form>
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
                                <thead>
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