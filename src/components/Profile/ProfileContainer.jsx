import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getUserData, getUserStatus, updateStatus, updateProfilePhoto } from "../../redux/profile-reducer";
import { withRouter } from 'react-router';
import { compose } from 'redux';
class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {
                userId = this.props.history.push("/login")
            }
        }
        this.props.getUserData(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.refreshProfile()
        }
    }


    render() {
        return (
            <Profile {...this.props} updateStatus={this.props.updateStatus} isOwner={!!this.props.match.params.userId} updateProfilePhoto={this.props.updateProfilePhoto}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    uId: state.usersPage.uId,
});

export default
    compose(
        connect(mapStateToProps, { getUserData, getUserStatus, updateStatus, updateProfilePhoto }),
        withRouter,

    )(ProfileContainer);