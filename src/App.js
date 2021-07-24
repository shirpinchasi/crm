import './App.css';
import Menu from './Menu/Menu';
import Users from './users';
import { BrowserRouter, Route, useLocation } from "react-router-dom";
import Calls from './Calls/Calls';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import LogOff from './SignUp/LogOff';





function App() {

  // const user = null;

  return  (
    <div className="App">
      
      <BrowserRouter>
        <Route exact path="/Calls">
          <Calls Component={Calls} />
        </Route>
        <Route exact path="/LogOff">
            <LogOff/>
        </Route>
        {/* <Route exact path="/SignUp">
            <SignUp/>
        </Route> */}
        <Route exact path="/Login">
            <Login/>
        </Route>
        <Route exact path="/">

        </Route>

      </BrowserRouter>
      {/* {user && <Menu />} */}
    </div>
  );
}

export default App;
