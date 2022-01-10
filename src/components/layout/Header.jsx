import { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/AuthContext';

const Header = () => {

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {user, logOut, userInformation}= authContext; 

    useEffect(()=>{
        userInformation();
        //eslint-disable-next-line
    },[]);

    return ( 
        <header className="app-header">

            {user 
                ?<p className="nombre-usuario"> Hola <span>{user.name}</span></p>
                : null}
            <nav className="nav-principal">
                <button className="btn btn-logOut" onClick={()=> logOut()}>Cerrar Sesion</button>
            </nav>

        </header>
     );
}
 
export default Header;