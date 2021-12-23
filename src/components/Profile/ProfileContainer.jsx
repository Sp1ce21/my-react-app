import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserData, getUserStatus, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from 'react-router';
import { compose } from 'redux';
class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId =  this.props.userId;
            if(!userId) {
                userId = this.props.history.push("/login")
            }
        }
        this.props.getUserData(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return (
            <Profile {...this.props} updateStatus={this.props.updateStatus}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status:  state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    uId: state.usersPage.uId,
});

export default
    compose(
        connect(mapStateToProps, { getUserData, getUserStatus, updateStatus }),
        withRouter,
        
    )(ProfileContainer);