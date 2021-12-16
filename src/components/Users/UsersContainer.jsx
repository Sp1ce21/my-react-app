import React from 'react';
import { connect } from "react-redux";
import { setCurrentPage, setUsers, setTotalUsersCount, toggleIsFetching, getUsersThunkCreator, followTC, unfollowTC } from "../../redux/users-reducer";
import Users from "./Users";
import preloader from '../../assets/images/150x150.gif';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return <div style={{ position: 'relative' }}>
            {this.props.isFetching ? <img src={preloader} style={{ position: 'absolute' }} /> : <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                isFollowing={this.props.isFollowing}
                toggleFollowing={this.props.toggleFollowing}
                followTC={this.props.followTC}
                unfollowTC={this.props.unfollowTC}
            />}
        </div>
    }
}


let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowing: state.usersPage.isFollowing,
    }
}


export default compose(
    // withAuthRedirect,
    connect(mapStateToProps, {
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching,
        getUsersThunkCreator,
        followTC,
        unfollowTC,
}))(UsersContainer);