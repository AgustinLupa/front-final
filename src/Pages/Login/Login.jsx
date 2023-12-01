import { useState } from 'react';
import { LogInRequest } from '../../Services/Login';
import { Navigate } from 'react-router-dom';

const Login = (props) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const submmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const rsp = await LogInRequest(formData);
      setResponse(rsp);

      if (rsp?.response?.token) {
        localStorage.setItem('jwt', rsp.response.token);
        props.onLogin();
        setRedirect(true);
      } else {
        setError('No se pudo iniciar sesión en este momento.');
      }
    } catch (error) {
      setError('Ocurrió un error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {    
    if (response.response?.user?.id_Role === 2) {
      return <Navigate to='/users' replace={true} />;
    } else {
      return <Navigate to='/employee' replace={true} />;
    }
  }

    return (
        <>
            <section className="container">                
                <div className="row justify-content-center">
                    <div className="col-md-6 my-5">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={submmitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="" className="text-sm text-gray-700">Nombre de Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control border-double border-4 border-sky-500 text-center"
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Clave</label>
                                        <input
                                            type="password"
                                            className="form-control border-double border-4 border-sky-500 text-center"
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            disabled={loading}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Ingresando...' : 'Ingresar'}
                                    </button>
                                </form>
                                {error && <div className="text-danger m-10">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;