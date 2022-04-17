import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu/Menu';
import { Route, useNavigate, Routes, BrowserRouter, } from "react-router-dom";
import Calls from './components/Calls/Calls';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Req from "./components/Req/Req";
import Users from "./components/Users/Users"
import CallInfo from './components/CallInfo/CallInfo';
import { UserContext } from "./userContext";
import { UserService } from "./userService"
import AdminPanel from './components/adminPanel/adminPanel';
import PageNotFound from "./PageNotFound/PageNotFound"
import UserInfo from './components/Users/userInfo';


function App(props) {

  const [fetchUser, setUser] = useState({});
  const types = {one :"one", two:"two"}
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function getUser() {
      const user = await UserService.get();
      if (!user) {
        setUser(null)
        setLoading(false)
        navigate("/Login")
      } else {
        console.log(user);
        setLoading(false)
        setUser(user)
      }
    }
    getUser();
    setLoading(true)
  }, [])

  return (
    <>
      <div className="App">
        {isLoading ? <div></div> :
          <UserContext.Provider value={{ fetchUser, setUser }}>
            {!fetchUser ? (
              <>
                <Routes>
                  <Route path="/Login" element={<Login />} />
                  <Route path="/SignUp" element={<SignUp />} />
                </Routes>

              </>
            ) : (
              <>
                <Menu props={fetchUser}/>
                <Routes>
                  <Route path="/callInfo/:id" element={<CallInfo props={fetchUser} />} />
                  <Route path="/Requests" element={<Req props={fetchUser} />} />
                  <Route path="/Users" element={<Users />} />
                  <Route path='/userInfo/:id' element={<UserInfo/>}/>
                  <Route path="/Calls" element={<Calls props={fetchUser} />} />
                  <Route path="/adminPanel" element={<AdminPanel props={fetchUser}/>} />
                  <Route path="/" element={"/"}/>
                  <Route path="/Hello"/>
                  <Route path='/Oops' element={<PageNotFound />} />
                  <Route element={<PageNotFound />} />
                </Routes>
              </>
            )
            }

          </UserContext.Provider>
        }
      </div>

    </>
  );
}

export default App;
