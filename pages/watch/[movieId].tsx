import { useRouter } from 'next/router';
import useMovie from '@/hooks/useMovie';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className='h-screen w-screen bg-slate-950'>
      <nav
        className='
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          gap-8
          bg-slate-950
          bg-opacity-70
        '
      >
        <AiOutlineArrowLeft
          onClick={() => router.push('/')}
          className='text-slate-100 cursor-pointer'
          size={30}
        />
        <p className='text-slate-100 text-1xl md:text-2xl font-bold'>
          <span className='font-light'>Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video
        muted
        autoPlay
        controls
        src={data?.videoUrl}
        className='h-full w-full'
      />
    </div>
  );
};

export default Watch;
