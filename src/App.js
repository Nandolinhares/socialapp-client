import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Theme from '../src/util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

//Components
import Navbar from './components/Navbar';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme(Theme);

let authenticated;
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
  }
  
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>     
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home}/>
              <AuthRoute exact path="/login" component={login} authenticated={authenticated} />
              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated} />
            </Switch>
          </div>
        </Router>      
      </Provider>  
    </MuiThemeProvider>
  );
}

export default App;
