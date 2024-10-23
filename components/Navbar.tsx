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
    <nav className='w-full fixed z-40'>
      <div
        className={` 
          px-4 md:px-16 
          py-6 flex 
          flex-row 
          items-center 
          transition 
          duration-500 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
        `}
      >
        <img
          className='w-24 lg:w-36 mr-1'
          src='/images/logo.png'
          alt='netflix logo'
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
          <p className='text-white text-sm'>Browser</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className='flex flex-row ml-auto gap-7 items-center '>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
            <BsSearch />
          </div>
          <div className='text-gray-200 hover:text-gray-300 cursor-pointer transition'>
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
                src='/images/default-blue.png'
                alt='user avatar'
              />
            </div>
            <BsChevronDown
              className={`text-white transition ${
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
