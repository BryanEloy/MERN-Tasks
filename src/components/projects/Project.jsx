import { useContext } from "react";
import ProjectContext from "../../context/projects/ProjectContext";
import TaskContext from "../../context/tasks/TaskContext";

const Project = ( {project} ) => {

    //Obtener la iformacion del state Project
    const projectContext= useContext(ProjectContext);
    const {selectProject}= projectContext;

    //Obtener la iformacion del state Task
    const taskContext= useContext(TaskContext);
    const {getTasks}= taskContext;

    //Mostrar informacion del proyecto
    const hanldeClick= (id)=>{
        selectProject(id)//Proyecto actual
        getTasks(id)//Tareas del proyecto
    }

    return ( 
        <li>
            <button type="button" className="btn btn-blank" onClick={ ()=> hanldeClick(project._id) }>
                {project.name}</button>
        </li>
     );
}
 
export default Project;