import React, { useContext} from 'react';

import TaskContext from "../../context/tasks/TaskContext";

const Task = ( {task} ) => {

    //Obtener la iformacion del state Task
    const taskContext= useContext(TaskContext);
    const { deleteTask, getTasks, editTask, selectTask }= taskContext;

    //Eliminar una tarea
    const btnDelete= (id)=>{
        deleteTask(id, task.project);
        getTasks(task.project)
    }

    //Modificaar el estado de una tarea
    const btnChange= (task)=>{
        if(task.state){
            task.state= false;
        }else
            task.state= true;
            
        editTask(task);
    }

    //Editar una tarea
    const btnEdit= (task)=>{
        selectTask(task)
    }

    return ( 
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                {task.state
                    ? (<button type="button" className="completo" onClick={()=> btnChange(task)}>
                        Completo</button>)
                    : (<button type="button" className="incompleto" onClick={()=> btnChange(task)}>
                        Incompleto</button>)
                }
            </div>

            <div className="acciones">
                <button type="button" className="btn btn-primario" onClick={()=> btnEdit(task)}>Editar</button>
                <button type="button" className="btn btn-secundario" onClick={()=> btnDelete(task._id)}>
                    Eliminar</button>
            </div>
        </li>
     );
}
 
export default Task;