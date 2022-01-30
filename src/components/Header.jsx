import logo from '../account-management-system-logo-solid-color-dark-zoomedout.jpg';
import { colors } from '../colors';
import logout from '../logout-cropped.png'

export default function Header( {logoutHandler} ) {
    return (
        <div style={styles.header}>
            <img src={logo} width='200px'/>
            <a style={styles.link} onClick={logoutHandler} href=''>Logout</a>
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