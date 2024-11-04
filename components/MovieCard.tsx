import FavoriteButton from './FavoriteButton';
import { BsFillPlayFill } from 'react-icons/bs';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/router';
import useInfoModal from '@/hooks/useInfoModal';

interface MovieCardProps {
  data: Record<string, string>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className='group bg-slate-950 col-span relative mx-2'>
      <img
        className='
          cursor-pointer 
          object-cover 
          transition 
          duration 
          shadow-xl 
          rounded-md 
          group-hover:opacity-90 sm:group-hover:opacity-0 
          delay-300 
          w-full 
          h-full
        '
        src={data.thumbnailUrl}
        alt='Movie Thumbnail'
      />
      <div
        className='
          opacity-0 
          absolute 
          top-0 
          transition 
          duration-200 
          z-10 
          delay-300 
          w-full
          scale-0 
          group-hover:scale-110 
          group-hover:opacity-100
        '
      >
        <img
          className='
            cursor-pointer 
            object-cover 
            transition 
            duration 
            shadow-xl 
            rounded-l-md 
            w-full 
            h-1/2
          '
          src={data.thumbnailUrl}
          alt='Movie Thumbnail'
        />

        <div
          className='
            z-10 
            bg-slate-800
            p-2 lg:p-4 
            absolute 
            w-full 
            transition 
            shadow-md 
            rounded-b-md
     
            '
        >
          <div className='flex flex-row items-center gap-3'>
            <div
              className='
                cursor-pointer
                w-6 lg:w-10
                h-6 lg:h-10 
                bg-slate-100
                rounded-full 
                flex 
                justify-center 
                items-center 
                transition 
                hover:bg-slate-300
              '
              onClick={() => router.push(`/watch/${data?.id}`)}
              onKeyDown={() => router.push(`/watch/${data?.id}`)}
            >
              <BsFillPlayFill size={20} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={() => openModal(data?.id)}
              onKeyDown={() => openModal(data?.id)}
              className='
                cursor-pointer
                ml-auto
                group/item
                w-6 lg:w-10
                h-6 lg:h-10
                border-slate-100
                border-2
                rounded-full
                flex
                justify-center
                items-center
                transition
                hover:border-slate-300
              '
            >
              <BiChevronDown
                className='text-slate-100 group-hover/item:text-slate-300'
                size={30}
              />
            </div>
          </div>
          <p className='text-green-400 font-semibold mt-4'>
            New <span className='text-slate-100'>2024</span>
          </p>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-slate-100 text-[10px] lg:text-sm'>
              {data.duration}
            </p>
          </div>
          <div className='flex flex-row mt-4 gap-2 items-center'>
            <p className='text-slate-100 text-[10px] lg:text-sm'>
              {data.genre}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
