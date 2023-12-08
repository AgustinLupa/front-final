import { useState } from 'react';
import { LogInRequest } from '../../Services/Login';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});  
  const [redirect, setRedirect] = useState(false);

  const submmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);    
    const rsp = await LogInRequest(formData);
    setResponse(rsp);

    if (rsp) {
      localStorage.setItem('user');      
      props.onLogin();
      setRedirect(true);
    }    
    setLoading(false);    
  };

  if (redirect) {
    
    if (response) {
      return <Navigate to='/users' replace={true} />;
    } else {
      return <Navigate to='/employees' replace={true} />;
    }
  }

    return (
        <>
            <section className="vh-100 gradient-custom">
              <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                  <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                      <div className="card-body p-5 text-center">
                        <form className='mb-md-5 mt-md-4 pb-5' onSubmit={submmitHandler}>
                          <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                          <p className="text-white-50 mb-5">Porfavor ingrese su usuario y clave para iniciar!</p>
                              <div className="form-group form-outline form-white mb-4">
                                  <label htmlFor="" className="text-sm text-gray-700">Nombre de Usuario</label>
                                  <input
                                      type="text"
                                      className="form-control border-double border-4 border-sky-500 text-center"
                                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                      disabled={loading}
                                  />
                              </div>
                              <div className="form-group form-outline form-white mb-4">
                                  <label htmlFor="">Clave</label>
                                    <input
                                      type="password"
                                      className="form-control border-double border-4 border-sky-500 text-center"
                                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                      disabled={loading}
                                  />
                              </div>
                              <button type="submit" className="btn btn-outline-light btn-lg px-5" disabled={loading}>
                                  {loading ? 'Ingresando...' : 'Ingresar'}
                              </button>
                          </form>                          
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
        </>
    );
}

export default Login;