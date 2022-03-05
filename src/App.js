import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu/Menu';
import {Route,useNavigate,Routes, BrowserRouter,} from "react-router-dom";
import Calls from './components/Calls/Calls';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Req from "./components/Req/Req";
import Users from "./components/Users/Users"
import CallInfo from './components/CallInfo/CallInfo';
import { UserContext } from "./userContext";
import {UserService} from "./userService"
import AdminPanel from './components/adminPanel/adminPanel';
import PageNotFound from "./PageNotFound/PageNotFound"


function App(props) {
  
  const [fetchUser, setUser] = useState({});
  const [haveAccess, setAccess]= useState(false)
  const navigate = useNavigate()

  useEffect(()=> {
    async function getUser(){
      const user = await UserService.get();
      setUser(user);
      if (user === null ) {
        navigate("/Login")
      }
    }
    getUser();
  },[])

  return (
    <div className="App">
      <UserContext.Provider value={{ fetchUser, setUser }}>
        {!fetchUser ?
        <>
          <Routes>
              <Route path="/Login" element={<Login/>}/>
              <Route path="/SignUp" element={<SignUp/>}/>
        </Routes>
         </>
        :
        <>
        <Menu props={fetchUser}/>
        <Routes>
        <Route path="/callInfo/:id" element={<CallInfo props={fetchUser}/>}/>
        <Route path="/Requests" element={<Req props={fetchUser}/>}/>
        <Route path="/Users" element={<Users/>}/>
        {/* <Route path='/userInfo/:id?' element={<User}/> */}
        <Route path="/Calls" element={<Calls props={fetchUser}/>}/>
      <Route path="/adminPanel" element={<AdminPanel props={fetchUser}/>}/>
        <Route path="/" element={"/"}/>
        <Route element={<PageNotFound/>}/>
        </Routes>
        </>
      }
      </UserContext.Provider>




    </div>
  );
}

export default App;
