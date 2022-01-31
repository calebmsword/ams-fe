import logo from '../account-management-system-logo-solid-color-dark-zoomedout.jpg';
import { colors } from '../colors';

export default function Header( {logoutHandler} ) {
    return (
        <div style={styles.header}>
            <img alt='logo' src={logo} width='200px'/>
            <span style={styles.link} onClick={logoutHandler} >Logout</span>
        </div>
    );
}

const styles = {
    header: {
        backgroundColor: colors.headerBackground,
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: '10px'
        // color: 'white',
    },
    link: {
        padding: '25px', 
        color: 'white', 
        textDecoration: 'none',
    }
}