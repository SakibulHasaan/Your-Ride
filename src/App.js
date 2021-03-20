import './App.css';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import { createContext, useContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import FindRoute from './components/FindRoute/FindRoute';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>

      
      <Router>
       <Header></Header>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <PrivateRoute path="/destination/:vehicle">
              <FindRoute></FindRoute>
          </PrivateRoute>

          <Route exact path="/login">
              <Login></Login>
          </Route>
        </Switch>

      </Router>

      
    </UserContext.Provider>
  );
}

export default App;
