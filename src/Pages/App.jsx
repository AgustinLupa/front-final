import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import {Base} from "../Layouts/Base"

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
