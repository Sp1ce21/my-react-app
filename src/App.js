import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
function App(props) {
    return (
        <Router>
            <div className="app-wrapper container">
                <HeaderContainer />
                <div className='app-row'>
                    <NavContainer /> {/*state={props.state.navbar}*/}
                    <Switch>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer store={props.store} />} />
                        <Route path='/dialogs' render={() => <DialogsContainer store={props.store} />} />
                        <Route path='/users' render={() => <UsersContainer />} />
                        <Route path='/login' render={() => <Login />} />
                        {/* <Route path='/' component={Profile} /> */}
                    </Switch>
                </div>
            </div>
        </Router>
    );

}


export default App;
