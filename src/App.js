import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu/Menu';
import { Route, useNavigate, Routes, BrowserRouter,useParams } from "react-router-dom";
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
import GetSystems from './components/Systems/GetSystems';
import Home from './components/Home/Home';
import ForgetPasswordEmail from './ForgetPasswordEmail/forgetPasswordEmail';
import ForgetPassword from "./forgetPassword/forgetPassword"


function App(props) {
  const [fetchUser, setUser] = useState({});
  const [types, setTypes] = useState({});
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    async function getUser() {
      
      const user = await UserService.get();
      if (!user) {
        setUser(null)
        setLoading(false)
        if(window.location.pathname.includes("/ForgetPassword")){
          <ForgetPassword/>
        }else{
          navigate("/Login")
        }
        
      } else {
        if(window.location.pathname.includes("/ForgetPassword")){
          navigate("/")
        }
        setLoading(false)
        setTypes(user.valid)
        setUser(user.user)
      }
    }
    getUser();
    console.log(fetchUser);
    setLoading(true)
  }, [])


  return (
    <>
      <div className="App">
        {isLoading ?<> <div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div><div>Loading</div></> :
          <UserContext.Provider value={{ fetchUser, setUser }}>
            <Routes>
              <Route path='/ForgetPassword/:id/:token' element={<ForgetPassword/>}/>
            </Routes>
            {!fetchUser ? (
              <>
                <Routes>
                  <Route path="/Login" element={<Login />} />
                  <Route path="/SignUp" element={<SignUp />} />
                  <Route path='/ForgetPasswordEmail' element={<ForgetPasswordEmail/>}/>
                </Routes>

              </>
            ) : (
              <>
                <Menu props={fetchUser} types={types} />
                <Routes >
                  {types === "admin" ?
                    <>
                    <Route path='/' element={<Home/>} />
                      <Route path='callInfo/:id' element={<CallInfo props={fetchUser} />} />
                      <Route path='Requests' element={<Req props={fetchUser} types={types} />} />
                      {/* <Route path='Catalog' element={<GetSystems props={fetchUser} types={types} />} /> */}
                      <Route path='Users' element={<Users />} types={types} />
                      <Route path='userInfo/:id' element={<UserInfo />} props={fetchUser} types={types} />
                      <Route path='Calls' element={<Calls props={fetchUser} />} />
                      <Route path='adminPanel' element={<AdminPanel props={fetchUser} types={types} />} />
                      <Route path='getCallsPerUser' element={<AdminPanel props={fetchUser} types={types} />} />
                      <Route element={<PageNotFound />} />
                    </>
                    :
                    <>
                      <Route element={<PageNotFound />} />
                      <Route exact path='/' element={<Home />} />
                    </>
                  }
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
