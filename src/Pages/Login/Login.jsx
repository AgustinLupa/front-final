import { useState } from 'react';
import { LogInRequest } from '../../Services/Login';
import { Navigate } from 'react-router-dom';


const Login = (props) => {

    const [formData, setFormData] = useState({});
    const [success, setSucces] = useState(false);
    const [response, setResponse] = useState({});

    const submmitHandler = async (e) => {
        e.preventDefault();
        const rsp= await LogInRequest(formData);               
        setResponse(rsp)
                           
        if (rsp?.response.token) {
            localStorage.setItem('jwt', rsp.response.token);
            props.setIsLoged(true);
            setTimeout(() => {
                setSucces(true);
            }, 500);
        } else {
            window.alert('No se pudo iniciar sesión en este momento.');
        }                    
    };

    const redirectUsers = ()=>{                
        if(success ){            
            if( response.response.user.id_Role == 2){
                
                return <Navigate to='/users' replace={true} />
            }else{
                return <Navigate to='/employee' replace={true} />
            }           
        }
    }

    return(
        <>       
        <section className="container">
            {                
               redirectUsers() 
            }
            <div className="row justify-content-center">
                <div className="col-md-6 my-5">
                    <div className="card">
                        <div className="card-body">                                               
                            <form onSubmit={submmitHandler}>
                                <div className="form-group">
                                    <label htmlFor="" className="text-sm text-gray-700">Nombre de Usuario</label>
                                    <input type="text" className="form-control border-double border-4 border-sky-500 text-center" onChange={e => setFormData({...formData, username: e.target.value})}/>                    
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Clave</label>                   
                                    <input type="password" className="form-control border-double border-4 border-sky-500 text-center"onChange={e => setFormData({...formData, password: e.target.value})}/>                    
                                </div>                
                                <button type="submit" className="btn btn-primary">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                                   
        </section>
        </>
    );
}

export default Login;