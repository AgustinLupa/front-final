import { Link } from "react-router-dom";

const Base = (props) => {
    return(
        <>
        <section className="w-[100vw] flex justify-center">
            <menu className="w-[100vw] h-[3rem] absolute bg-slate-500 shadow-sm flex justify-evenly items-center text-white">
                <div className="dropdown-menu">
                    <span className="dropdown-item-text">Usuarios</span>
                        <Link className="dropdown-item" to='/users' replace={true}>Buscar Usuarios</Link>
                        <Link className="dropdown-item" to='/createUser' replace={true}>Crear Usuarios</Link>
                </div>                
            </menu>
            <div className="mt-[4rem]">
                {props.children}
            </div>
        </section>
        </>
    );
}

export default Base;