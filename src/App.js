import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu/Menu';
import { BrowserRouter, Route, useLocation, useHistory, Redirect, withRouter,Switch } from "react-router-dom";
import Calls from './components/Calls/Calls';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import LogOff from './components/LogOff/LogOff';
import Req from "./components/Req/Req";
import Users from "./components/Users/Users"
import CallInfo from './components/CallInfo/CallInfo';
import { UserContext } from "./userContext";
import {UserService, UserContextProvider} from "./userService"
import AdminPanel from './components/adminPanel/adminPanel';





function App(props) {
  
  const [fetchUser, setUser] = useState({});
  const [data, setData] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation()
  

  useEffect(()=> {
    async function getUser(){
      const user = await UserService.get();
      setUser(user);
      setLoading(false);
      console.log(user);
      if (!user) {
        history.push("/Login");
      }
    }
    getUser();
  },[history])



  
 

  return (
    <div className="App">
      <UserContext.Provider value={{ fetchUser, setUser }}>
      {isLoading && <div className="App__Loading">Loading...</div>}
        <Switch>
        {/* <Route exact path="/Login">
            <Login Component={Login}/>
          </Route> */}
          <Route exact path="/callInfo/:id?">
            <CallInfo />
          </Route>
          <Route exact path="/Requests">
            <Req />
          </Route>
          <Route exact path="/addUser">
            <addUser Component={Users} />
          </Route>
          <Route exact path="/Calls">
            <Calls Component={Calls} />
          </Route>
          <Route exact path="/SignUp">
            <SignUp/>
        </Route>
        <Route exact path="/adminPanel">
            <AdminPanel Component={AdminPanel}/>
        </Route>
          <Route exact path="/">

          </Route>

        </Switch>
        
        <div>
          {!fetchUser ? <Login/> : <Menu props={fetchUser}/>}
        {/* {fetchUser && <Menu props={fetchUser}/>} */}
        </div>
        
      </UserContext.Provider>




    </div>
  );
}

export default App;
