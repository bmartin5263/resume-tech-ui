import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import styles from "styles/navigation.module.scss";
import { signOut } from 'next-auth/react';
import useAuth from '../hooks/useAuth';
import useLog from '../hooks/useLog';
import Logo from './logo';
import Button, { ButtonShape, ButtonType } from './button';
import Icon from './icon';
import RowBreak from './rowBreak';

function Navigation() {
  const router = useRouter();
  const isAuthenticated = useAuth(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const log = useLog("Navigation");

  return (
    <>
      <nav>
        <Logo/>
          {createLink("/strategies", "Strategies", router.pathname)}
          {isAuthenticated && createLink("/trading", "Trading", router.pathname)}
          {isAuthenticated && createLink("/bots", "Bots", router.pathname)}
          {isAuthenticated && createLink("/simulations", "Simulations", router.pathname)}
        {/* <div>
        </div> */}
        {!isAuthenticated && <Link href="/login" id={styles.loginButton} className='button button-primary'>Login</Link>}
        {isAuthenticated && <Button className='button' id={styles.signOutButton} onClick={() => signOut()}>Sign Out</Button>}
        {!isAuthenticated && <Link href="/register" id={styles.registerButton} className='button'>Register</Link>}
        <Button id={styles.toggleDarkModeButton} buttonType={ButtonType.BASIC} shape={ButtonShape.IMAGE} onClick={toggleDarkMode}>
          {darkMode ? <Icon>light_mode</Icon> : <Icon>dark_mode</Icon>}
        </Button>
      </nav>
    </>
  );
}

function createLink(path, name, currentPage) {
  var c = styles.link;
  if (currentPage == path) {
    c = c + " " + styles.activePage;
  }
  return <Link href={path} className={c}>{name}</Link>
}

export default Navigation