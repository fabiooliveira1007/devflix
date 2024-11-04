import useBillboard from '@/hooks/useBillboard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import PlayButton from './PlayButton';
import useInfoModal from '@/hooks/useInfoModal';
import { useCallback } from 'react';

const Billboard = () => {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id);
  }, [openModal, data?.id]);

  return (
    <div className='relative h-[70vw] sm:h-[60vw] max-h-[540px]'>
      <video
        className='w-full h-[70vw] sm:h-[60vw] max-h-[540px] object-cover brightness-[60%]'
        loop
        muted
        autoPlay
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className='absolute top-[40%] sm:top-[30%] ml-4 md:ml-16'>
        <p
          className='
            text-slate-100 
            text-2xl md:text-5xl lg:text-6xl
            whitespace-nowrap
            h-full 
            w-[50%] 
            font-bold 
            drop-shadow-xl
          '
        >
          {data?.title}
        </p>
        <p
          className='
            text-slate-100 text-[12px] md:text-lg 
            mt-3 md:mt-8 
            w-[90%] md:w-[50%] lg:w-[50%] 
            drop-shadow-xl
          '
        >
          {data?.description}
        </p>
        <div
          className='
            flex 
            flex-row 
            items-center 
            mt-3 md:mt-4 
            gap-3
          '
        >
          <PlayButton movieId={data?.id} />
          <button
            type='button'
            onClick={handleOpenModal}
            className='
              bg-slate-100
              text-slate-100
              bg-opacity-30 hover:bg-opacity-20
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4 
              w-auto 
              text-xs lg:text-lg 
              font-semibold 
              flex 
              flex-row 
              items-center
              transition
            '
          >
            <AiOutlineInfoCircle
              className='mr-1'
              size={16}
            />
            <p>More Info</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
