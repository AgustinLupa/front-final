import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "../Layouts/Base";
import Login from "./Login/Login";
import Users from "./Users/Users";
import Employees from "./Employees/Employees";
import Logout from "./Login/Logout";

function App() {

  const [availableRoutes, setAvailableRoutes] = useState([]);
  const [isLoged, setIsLoged] = useState(false);  

  const handleLogin = () => {
    setIsLoged(true);
  };

  const isLogged= ()=> {
    return isLoged;
  }

  useEffect(() => {
    if(localStorage.getItem('user')){
      setAvailableRoutes(
        [
          {
            path:'/logout',
            element: <Logout />
          },
          {
            path:'/login',
            element: <Login onLogin={handleLogin} isLogged={isLogged}/>
          },
          {
            path:'/users',
            element: <Base children={<Users />}/>
          },                    
          {
            path:'/employees',
            element: <Base children={<Employees />}/>
          }
        ]
      );      
      setIsLoged(true);
    } else {
      setAvailableRoutes([]);
      setIsLoged(false);
    }}, [isLoged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login onLogin={handleLogin} isLogged={isLogged} />} />
        {
          availableRoutes.map((item, index) => {
            return(
              <Route path={item.path} element={item.element} key={index}/>
            );
          })
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
