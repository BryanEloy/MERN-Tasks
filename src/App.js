import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Login from './components/auth/Login';
import NewAcount from './components/auth/NewAcount';
import Projects from './components/projects/ProjectsMenu';

import ProjectState from './context/projects/ProjectState';
import TaskState from './context/tasks/TaskState';
import AlertState from './context/alertas/AlertState';
import AuthState from './context/auth/AuthState';

import PrivateRoute from './components/routes/PrivateRoute';

import authToken from './config/token';

//Revisar si hay un JWT activo
const token= localStorage.getItem('token');
if(token){
  authToken(token);
}
  

function App() {
  return (
    <ProjectState>
    <TaskState>
    <AlertState>
    <AuthState>

      <Router>
        <Routes>

          <Route exact path='/' element={ <Login/> }/>
          <Route exact path='/newAcount' element={<NewAcount/>}/>
          <Route exact path='/projects' element={
            <PrivateRoute>
              <Projects/>
            </PrivateRoute>
          }/>

        </Routes>
      </Router>

    </AuthState>      
    </AlertState>
    </TaskState>
    </ProjectState>
    
  );
}

export default App;
