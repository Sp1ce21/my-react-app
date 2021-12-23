import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import NavContainer from './components/Nav/NavContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialize } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
class App extends React.Component {

    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if(!this.props.initialized) return <Preloader/>
        return (
            <Router>
                <div className="app-wrapper container">
                    <HeaderContainer />
                    <div className='app-row'>
                        <NavContainer />    
                        <Switch>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
                            <Route path='/dialogs' render={() => <DialogsContainer />} />
                            <Route path='/users' render={() => <UsersContainer />} />
                            <Route path='/login' render={() => <Login />} />
                            <Route path='/' render={() => <ProfileContainer />} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );

    }
}

const mapStateToProps = (state) =>({
    initialized: state.app.initialized,
})

export default compose(
    connect(mapStateToProps, { initialize}))(App);
