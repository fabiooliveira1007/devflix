import { BsFillPlayFill } from 'react-icons/bs';
import { useRouter } from 'next/router';

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <button
      type='button'
      onClick={() => router.push(`/watch/${movieId}`)}
      className='
        bg-slate-100
        rounded-md 
        py-1 md:py-2 
        px-2 md:px-4 
        w-auto 
        text-xs lg:text-lg
        font-semibold
        flex 
        flex-row
        items-center
        hover:bg-slate-300
        transition
      '
    >
      <BsFillPlayFill
        size={16}
        className='mr-1 text-slate-950'
      />
      <p className='text-slate-950'>Play</p>
    </button>
  );
};

export default PlayButton;
