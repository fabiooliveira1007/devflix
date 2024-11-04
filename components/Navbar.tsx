import NavbarItem from './NavbarItem';
import MobileMenu from './MobileMenu';
import AccountMenu from './AccountMenu';

import { useCallback, useEffect, useRef, useState } from 'react';
import { BsChevronDown, BsSearch, BsBell } from 'react-icons/bs';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMobileMenu(false);
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', closeMenu);

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY >= TOP_OFFSET
        ? setShowBackground(true)
        : setShowBackground(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(current => !current);
  }, []);

  return (
    <nav className='w-full max-w-7xl fixed z-40'>
      <div
        className={` 
          px-4 md:px-16 
          py-6 flex 
          flex-row 
          items-center 
          transition 
          duration-500 ${showBackground ? 'bg-slate-950 bg-opacity-90' : ''}
        `}
      >
        <img
          className='w-20 lg:w-36 mr-1'
          src='/images/logo.svg'
          alt='Devflix logo'
        />
        <div className=' flex-row ml-4 gap-6 hidden lg:flex'>
          <NavbarItem label='Home' />
          <NavbarItem label='Series' />
          <NavbarItem label='Films' />
          <NavbarItem label='New & Popular' />
          <NavbarItem label='My List' />
          <NavbarItem label='Browse by Languages' />
        </div>
        <div
          ref={menuRef}
          onClick={toggleMobileMenu}
          onKeyDown={toggleMobileMenu}
          className='
            lg:hidden 
            flex 
            flex-row 
            items-center 
            gap-2 
            ml-3 
            cursor-pointer 
            relative
          '
        >
          <p className='text-slate-100 text-sm'>Browser</p>
          <BsChevronDown
            className={`text-slate-100 transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center '>
          <div className='text-slate-200 hover:text-slate-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-slate-200 hover:text-slate-300 cursor-pointer transition'>
            <BsBell />
          </div>
          <div
            ref={menuRef}
            onClick={toggleAccountMenu}
            onKeyDown={toggleAccountMenu}
            className='
              flex 
              flex-row 
              items-center 
              gap-2 
              cursor-pointer 
              relative'
          >
            <div
              className='
                w-6 lg:w-10
                h-6 lg:h-10 
                rounded-md 
                overflow-hidden
              '
            >
              <img
                src='/images/crazy-toad.gif'
                alt='User avatar'
              />
            </div>
            <BsChevronDown
              className={`text-slate-100 transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
