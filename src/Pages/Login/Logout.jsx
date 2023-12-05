// LogoutPage.js
import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        // Eliminar el token JWT del localStorage
        localStorage.removeItem('jwt');

        // Redireccionar a la página de inicio de sesión u otra página
        window.location.replace('/login');
    }, []);

    return (
        <div>
            <p>&nbsp;</p>
        </div>
    );
};

export default Logout;
