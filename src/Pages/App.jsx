import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Base from "../Layouts/Base";
import Login from "./Login/Login";
import Users from "./Users/Users";
import Employees from "./Employees/Employees";
import Suppliers from "./Suppliers/Suppliers";

function App() {

  const [availableRoutes, setvAilableRoutes] = useState([]);
  const [isLoged, setIsLoged] = useState(false);



  useEffect(() => {
    if(localStorage.getItem('jwt')){
      setvAilableRoutes(
        [
          {
            path:'/users',
            element: <Base children={<Users />}/>
          },          
          {
            path:'/supplier',
            element: <Base children={<Suppliers />}/>
          },
          {
            path:'/employee',
            element: <Base children={<Employees />}/>
          }
        ]
      );      
    }
  }, [isLoged]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Login setIsLoged={setIsLoged} />} />
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
