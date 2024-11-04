import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import PlayButton from './PlayButton';
import FavoriteButton from './FavoriteButton';
import useInfoModal from '@/hooks/useInfoModal';
import useMovie from '@/hooks/useMovie';

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className='
        z-50
        transition
        duration-300
        bg-slate-950
        bg-opacity-80
        flex
        justify-center
        items-center
        overflow-x-hidden
        overflow-y-auto
        fixed
        inset-0
      '
    >
      <div
        className='
          relative
          mx-6
          max-h-[85%]
          max-w-3xl
        overflow-y-auto
        '
      >
        <div
          className={`
            ${isVisible ? 'scale-100' : 'scale-0'}
            transform
            duration-200
            relative
            flex-auto
            bg-slate-800
            drop-shadow-md
          `}
        >
          <div className='relative h-[40vh]'>
            <video
              className='
                w-full
                brightness-[60%]
                object-cover
                h-full
              '
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            />
            <div
              className='
                cursor-pointer
                absolute
                top-3
                right-3
                h-10
                w-10
                rounded-full
                bg-slate-950
                bg-opacity-70
                flex
                items-center
                justify-center
              '
              onClick={handleClose}
              onKeyDown={handleClose}
            >
              <AiOutlineClose
                className='text-slate-100'
                size={20}
              />
            </div>
            <div className='absolute bottom-[10%] left-10'>
              <p
                className='
                  text-slate-100
                  text-3xl md:text-4xl lg:text-5xl
                  h-full
                  font-bold
                  mb-8
                '
              >
                {data?.title}
              </p>
              <div className='flex gap-4 items-center'>
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className='px-12 py-8'>
            <p className='text-green-400 font-semibold md:text-2xl pb-2'>New</p>
            <p className='text-slate-100 md:text-lg font-semibold'>{data?.duration}</p>
            <p className='text-slate-100 md:text-lg font-semibold'>{data?.genre}</p>
            <hr className='my-2 bg-slate-600' />
            <p className='text-slate-100 md:text-lg'>{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
