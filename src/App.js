import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios'

import './App.css';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Admin from './components/Admin';
import User from './components/User';
import BookTrain from './components/BookTrain';
import MyBookings from './components/MyBookings';
import AddTrain from './components/AddTrain';
import Trains from "./components/Trains";

import "bootstrap/dist/css/bootstrap.min.css"
import isAdmin from './components/isAdmin';

axios.defaults.withCredentials = false;

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif'
    ].join(','),
  }
});

const App=()=>{
    return(
      <ThemeProvider theme={theme}>
          <div>
              <Router>
                  <Switch>
                      <Route exact path='/'>
                          <Home/>
                      </Route>
                      <Route exact path='/signup'>
                          <Signup/>
                      </Route>
                      <Route exact path='/login'>
                          <Login/>
                      </Route>
                      <Route exact path='/admin' render = {()=>isAdmin() ? <Trains who="admin"/> :  <h1>Unauthorized</h1>}>
                      </Route>
                      <Route exact path='/user' render={()=>!isAdmin() ? <Trains who="user"/> :  <h1>Unauthorized</h1>} >
                          
                      </Route>
                      <Route exact path='/user/book/:trainno'>
                          <BookTrain/>
                      </Route>
                      <Route exact path='/user/mybookings'>
                          <MyBookings/>
                      </Route>
                      <Route exact path='/logout'>
                        <Logout/>
                      </Route>
                      <Route exact path='/addtrain'>
                        <AddTrain/>
                      </Route>
                  </Switch>
              </Router>
          </div>
      </ThemeProvider>
    )
}

export default App;