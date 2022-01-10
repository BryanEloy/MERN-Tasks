import { useContext, useState } from "react";

import ProjectContext from "../../context/projects/ProjectContext";

const NewProject = () => {

    //Obtener el state del formulario
    const projectContext= useContext(ProjectContext);
    const {form, error, showForm, addProject, showError}= projectContext;

    const [project, setProject]= useState({
        name: ''
    });

    const handleChange= (e)=>{
        setProject( {...project, [e.target.name]: e.target.value } )
    }

    const handleSubmit= (e)=>{
        e.preventDefault();

        //Validar que el proyecto tenga nombre
        if(project.name.trim()===''){
            showError();
           return 
        } 

        //Agregar al state y borrar informacion del input
        addProject(project);
        setProject({name:''});
    }
    return ( 
        <>
            <button type="button" className="btn btn-block btn-primario" onClick={showForm}>
                Nuevo Proyecto</button>

            {form
                ?(  <form className="formulario-nuevo-proyecto" onSubmit={handleSubmit}>
                        <input type="text" className="input-text" placeholder="Nombre del proyecto" name="name" 
                                value={project.name} onChange={handleChange}/>

                        <input type="submit" className="btn btn-primario btn-block" value="Agregar Proyecto" />

                    </form>)
                : null
            }
            {error
                ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                : null
            }
        </>
    );
}
 
export default NewProject;