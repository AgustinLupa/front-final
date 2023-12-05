import { Link } from "react-router-dom";

const Base = (props) => {
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">FinalERP</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to='/users' replace={true}>Usuarios</Link>  
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/employees' replace={true}>Empleados</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/suppliers' replace={true}>Proveedores</Link>
                        </li>                        
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to='/logout' replace={true}>Cerrar Sesión</Link>
                        </li>
                    </ul>
                </div>
                
            </nav>
            <div className="container">
                {props.children}
            </div>
        </>
    );
}

export default Base;