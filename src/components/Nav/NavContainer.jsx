import Nav from './Nav';
import { connect } from 'react-redux';
// function NavContainer(props) { 
//     return (
//         <Nav friends={props.state.friends}/>
//     )
// }
const mapStateToProps = (state) => {
    return {
        friends: state.navbar.friends,
    }
}

const NavContainer = connect(mapStateToProps)(Nav)

export default NavContainer;