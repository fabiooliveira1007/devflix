import Input from '@/components/input';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login'
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div
      className="
        relative 
        h-full 
        w-full 
        bg-[url('/images/hero.jpg')] 
        bg-no-repeat 
        bg-center 
        bg-fixed 
        bg-cover
      "
    >
      <div className='bg-slate-950 w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <Image
            className='sm:size-1/2 max-w-44'
            src='/images/logo.svg'
            alt='Devflix Logo'
            width={150}
            height={48}
          />
        </nav>
        <div className='flex justify-center'>
          <div
            className='
              bg-slate-950
              bg-opacity-70 
              px-12 
              py-12
              self-center 
              mt-2 
              w-full lg:w-2/5 
              max-w-lg lg:max-w-md 
              rounded-md
            '
          >
            <h2 className='text-slate-100 text-3xl mb-8'>
              {variant === 'login' ? 'Sign In' : 'Register'}
            </h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='Username'
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                  id='name'
                  type='name'
                  value={name}
                />
              )}
              <Input
              
                label='Email'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='Password'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(event.target.value)
                }
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              type='button'
              className='
                bg-slate-600 
                text-slate-100
                py-3 
                rounded-md 
                w-full 
                mt-10 
                hover:bg-slate-700 
                transition
              '
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div
              className='
                flex 
                flex-row 
                items-center 
                gap-4 
                mt-8 
                justify-center
              '
            >
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                onKeyDown={() => signIn('google', { callbackUrl: '/profiles' })}
                className='
                  w-10 
                  h-10 
                  bg-slate-100
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  cursor-pointer 
                  hover:opacity-80 
                  transition
                '
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                onKeyDown={() => signIn('github', { callbackUrl: '/profiles' })}
                className='
                  w-10 
                  h-10 
                  bg-slate-100
                  rounded-full 
                  flex 
                  items-center 
                  justify-center 
                  cursor-pointer 
                  hover:opacity-80 
                  transition
                '
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-slate-500 mt-12 text-center'>
              {variant === 'login'
                ? 'First time using DEVFLIX?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                onKeyDown={toggleVariant}
                className='text-slate-100 ml-1 hover:underline cursor-pointer block'
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
