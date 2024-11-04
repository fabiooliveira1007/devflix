interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div
      className='
        border-2 
        border-slate-800 
        bg-slate-950
        w-40 sm:w-56
        absolute 
        top-8 
        left-0 
        py-5 
        flex 
        flex-col
        text-xs sm:text-sm
      '
    >
      <div className='flex flex-col gap-4'>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          Home
        </div>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          Series
        </div>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          Films
        </div>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          New & Popular
        </div>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          My List
        </div>
        <div className='px-3 text-center text-slate-100 hover:underline'>
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
