import Head from 'next/head';
import Navigation from './navigation';
import Link from 'next/link';
import RowBreak from './rowBreak';
import Logo from './logo';
import Icon, { IconType } from './icon';
import { ReactNode, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import UserNavLink from './userNavLink';
import UserNavMenu from './userNavMenu';
import ThemeContext from './themeContext';

export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children } : LayoutProps) {
  const router = useRouter();
  const [leftNavClosed, setLeftNavClosed] = useState<boolean>(true);
  const [educationOpen, setEducationOpen] = useState<boolean>(false);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const page = router.pathname;

  const navButtonClassName = leftNavClosed ? 'toggle-user-nav-btn' : 'toggle-user-nav-btn toggle-user-nav-btn-active';
  const educationIcon = educationOpen ? 'expand_more' : 'chevron_right';

  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bd579"></link>
        <meta name="apple-mobile-web-app-title" content="ResumeTech"></meta>
        <meta name="application-name" content="ResumeTech"></meta>
        <meta name="msapplication-TileColor" content="#00a300"></meta>
        <meta name="theme-color" content="#585858"></meta>
      </Head>

      <main>
        <div className='flex-content'>
          <nav className='site-nav' style={{}}>
            <button onClick={e => setLeftNavClosed(!leftNavClosed)} className={navButtonClassName}>
              <span className='material-icons icon' style={{fontSize: '2.5em'}}>menu</span>
              {/* <span style={{}}>hello</span> */}
            </button>
            <Link href="/" className='logo'>ResumeTech</Link>

            <button className='btn' onClick={toggleDarkMode}>Hello</button>
            <button className='btn btn-primary' onClick={toggleDarkMode}>Hello</button>
            <button className='btn btn-primary btn-icon' onClick={toggleDarkMode}><Icon name='person'/></button>

            <button style={{display: 'flex', marginLeft: 'auto', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '100%', width: '4em'}}>
              <span className='material-icons icon' style={{fontSize: '3em'}}>account_circle</span>
              {/* <span style={{}}>hello</span> */}
            </button>
          </nav>

          <div className='site-column user-nav' style={leftNavClosed ? {display: 'none'} : {}}>
            <UserNavLink href="/profile" icon='person' iconType={IconType.NORMAL}>
              Profile
            </UserNavLink>
            <UserNavLink href="/jobs" icon='business_center'>
              Jobs
            </UserNavLink>
            <UserNavMenu>
              <UserNavLink href="/degrees" style={{paddingLeft: '1.5em'}} icon='school'>
                Degrees
              </UserNavLink>
              <UserNavLink href="/certificates" style={{paddingLeft: '1.5em'}} icon='workspace_premium'>
                Certificates
              </UserNavLink>
            </UserNavMenu>
            <UserNavLink href="/projects" icon='construction'>
              Projects
            </UserNavLink>
            <UserNavLink href="/resumes" icon='contact_page'>
              Resumes
            </UserNavLink>
            <UserNavLink href="/portfolios" icon='photo_album'>
              Portfolios
            </UserNavLink>
            <UserNavLink href="/websites" icon='public'>
              Websites
            </UserNavLink>
          </div>
          <div className='site-column main-column'>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}