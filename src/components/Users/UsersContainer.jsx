import React from 'react';
import { connect } from "react-redux";
import { compose } from 'redux';
import preloader from '../../assets/images/150x150.gif';
import { followTC, getUsersThunkCreator, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollowTC } from "../../redux/users-reducer";
import { getCurrentPage, getIsFetching, getIsFollowing, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';
import Users from "./Users";
class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
    }

    render() {
        return <div style={{ position: 'relative' }}>
            {this.props.isFetching ? <img src={preloader} alt="preloader" style={{ position: 'absolute' }} /> : <Users totalUsersCount={this.props.totalUsersCount}
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
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowing: getIsFollowing(state),
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