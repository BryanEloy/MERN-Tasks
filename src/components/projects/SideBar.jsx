import ListProjects from "./ListProjects";
import NewProject from "./NewProject";

const SideBar = () => {
    return ( 
        <aside>
            <h1>Mern <span>Tasks</span> </h1>
            <NewProject/>
            <div className="proyectos">
                <h2>Tus proyectos</h2>
                <ListProjects/>
            </div>

        </aside>
     );
}
 
export default SideBar;