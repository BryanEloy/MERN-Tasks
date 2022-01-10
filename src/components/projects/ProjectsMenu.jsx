import { useContext, useEffect } from 'react';

import Header from '../layout/Header';
import TaskForm from '../tasks/TaskForm';
import TasksList from '../tasks/TasksList';
import SideBar from './SideBar'

import AuthContext from '../../context/auth/AuthContext';


const Projects = () => {

    //Extraer la informacion del context de auth
    const authContext= useContext(AuthContext);
    const {userInformation}= authContext; 
    
    //Cuando se cargue la pagina d eprojectos vamos a llamar a la funcion par atraer la info del user
    useEffect(()=>{
        userInformation();
    },[]);

    return ( 
        <div className="contenedor-app">
            <SideBar/>

            <div className="seccion-principal">
                <Header/>

                <main>
                    <TaskForm/>
                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>

                </main>
            </div>
        </div>
    );
}
 
export default Projects;