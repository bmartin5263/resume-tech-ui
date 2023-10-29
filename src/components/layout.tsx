import Head from 'next/head';
import Navigation from './navigation';
import Link from 'next/link';
import RowBreak from './rowBreak';
import Logo from './logo';
import Icon from './icon';
import Btn from './btn'
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import LeftLink from './leftLink';

export type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children } : LayoutProps) {
  const router = useRouter();
  const page = router.pathname;
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
          <nav style={{flexBasis: '100%', display: 'flex', flexWrap: 'wrap', height: '4em', alignItems: 'center', gap: '.5em'}}>
            <button style={{display: 'flex', backgroundColor: '#444444', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '100%', width: '4em'}}>
              <span className='material-icons icon' style={{fontSize: '2.5em'}}>menu</span>
              {/* <span style={{}}>hello</span> */}
            </button>
            <Link href="/" className='logo'>ResumeTech</Link>
            <button style={{display: 'flex', marginLeft: 'auto', textAlign: 'center', alignItems: 'center', justifyContent: 'center', height: '100%', width: '4em'}}>
              <span className='material-icons icon' style={{fontSize: '3em'}}>account_circle</span>
              {/* <span style={{}}>hello</span> */}
            </button>
          </nav>

          <div className='site-column left-column'>
            <LeftLink href="/profile">
              <span className='material-icons icon' style={{padding: '0 .3em',}}>person</span>
              Profile
            </LeftLink>
            <LeftLink href="/jobs">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>business_center</span>
              Jobs
            </LeftLink>
            <LeftLink href="/education">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>expand_more</span>
              Education
            </LeftLink>
            <LeftLink href="/degrees" style={{paddingLeft: '1.5em'}}>
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>school</span>
              Degrees
            </LeftLink>
            <LeftLink href="/certificates" style={{paddingLeft: '1.5em'}}>
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>workspace_premium</span>
              Certificates
            </LeftLink>
            <LeftLink href="/projects">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>construction</span>
              Projects
            </LeftLink>
            <LeftLink href="/resumes">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>contact_page</span>
              Resumes
            </LeftLink>
            <LeftLink href="/portfolios">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>photo_album</span>
              Portfolios
            </LeftLink>
            <LeftLink href="/websites">
              <span className='material-icons-outlined icon' style={{padding: '0 .3em',}}>public</span>
              Websites
            </LeftLink>
          </div>
          <div className='site-column main-column'>
            {children}
          </div>
        </div>
      </main>
    </>
  );
}