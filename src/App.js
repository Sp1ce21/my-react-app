import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavContainer from './components/Nav/NavContainer';
import React, { Suspense } from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialize } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))


class App extends React.Component {

    componentDidMount() {
        this.props.initialize();
    }

    render() {
        if (!this.props.initialized) return <Preloader />
        return (
            <Router>
                <div className="app-wrapper container">
                    <HeaderContainer />
                    <div className='app-row'>
                        <NavContainer />
                        <Switch>
                            <Route path='/profile/:userId?' render={() =>
                                <Suspense fallback={<Preloader/>}>
                                    <ProfileContainer />
                                </Suspense>
                            } />
                            <Route path='/dialogs' render={() => <Suspense fallback={<Preloader/>}><DialogsContainer /></Suspense>} />
                            <Route path='/users' render={() => <Suspense fallback={<Preloader/>}><UsersContainer /></Suspense>} />
                            <Route path='/login' render={() => <Login />} />
                            <Route path='*' render={() => <div>404 Not Found</div>} />
                            <Route path='/' render={() => <Suspense fallback={<Preloader/>}>
                                <ProfileContainer />
                            </Suspense>} />
                            
                        </Switch>
                    </div>
                </div>
            </Router>
        );

    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

export default compose(
    connect(mapStateToProps, { initialize }))(App);
