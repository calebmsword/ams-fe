import logo from '../account-management-system-logo-solid-color-dark-zoomedout.jpg';
import { colors } from '../colors';

export default function Header( {logoutHandler} ) {
    return (
        <div style={styles.header}>
            <img src={logo} width='200px'/>
            <a onClick={logoutHandler} href=''>Logout</a>
        </div>
    );
}

const styles = {
    header: {
        backgroundColor: colors.headerBackground,
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        color: 'white',
    },
}