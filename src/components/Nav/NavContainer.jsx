import Nav from './Nav';
import { connect } from 'react-redux';
import { clearUId } from '../../redux/users-reducer';

const mapStateToProps = (state) => {
    return {
        friends: state.navbar.friends,
    }
}

const NavContainer = connect(mapStateToProps, {clearUId})(Nav)

export default NavContainer;