import { useContext, useEffect} from "react";
import { CSSTransition, TransitionGroup  } from 'react-transition-group';

import ProjectContext from "../../context/projects/ProjectContext";
import AlertContext from "../../context/alertas/AlertContext";

import Project from "./Project";

const ListProjects = () => {

    //Extraer los proyectos del state Project
    const alertContext= useContext(AlertContext);
    const {alert, showAlert}= alertContext;

    //Extraer los proyectos del state Alert
    const projectContext= useContext(ProjectContext);
    const {projects, mesage, getProjects}= projectContext;
    
    useEffect(()=>{
        //Mostrat mensaje de error 
        if(mesage) showAlert( mesage.msg, mesage.category)
        getProjects();
        //eslint-disbale-next-line
    },[mesage])
    
    //Si no hay proyectos retutn
    if(projects.length===0) return <p>Acualmente no hay proyectos pendientes</p>;

    return ( 
        <ul className="listado-proyectos">
            {alert 
                ? <div className={`alerta ${alert.category}`}>{alert.mesaage} </div>
                : null}

            <TransitionGroup>
                {projects.map( project =>(
                    <CSSTransition key={project._id} timeout={500} classNames="proyecto">
                      {<Project  project={project}/>}  
                    </CSSTransition>
                    
                ))}  
            </TransitionGroup>
            
        </ul>
     );
}
 
export default ListProjects;