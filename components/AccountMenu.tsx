import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data } = useCurrentUser();

  if (!visible) return null;

  return (
    <div
      className='
          bg-slate-950
          w-40 sm:w-56 
          absolute 
          top-10 
          right-0 
          py-5 
          flex 
          flex-col 
          border-2 
          border-slate-800 
        '
    >
      <div className=' flex flex-col gap-3'>
        <div
          className='
            px-3 
            group/item 
            flex 
            flex-row 
            gap-3 
            items-center 
            w-full
            text-xs sm:text-sm
          '
        >
          <img
            className='w-8 rounded-md'
            src='/images/crazy-toad.gif'
            alt='user avatar'
          />
          <p className='text-slate-100 group-hover/item:underline'>
            {data?.name}
          </p>
        </div>
        <hr className='bg-slate-800 border-0 h-px my-4' />
        <div
          onClick={() => signOut()}
          onKeyDown={() => signOut()}
          className='text-slate-100 text-center mx-10 p-2 hover:text-slate-300'
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
