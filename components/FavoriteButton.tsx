import axios, { AxiosPromise } from 'axios';
import { useCallback, useMemo } from 'react';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavorites from '@/hooks/useFavorites';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response = null;
    if (isFavorite) {
      response = await axios.delete('/api/favorite', { data: { movieId } });
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [isFavorite, movieId, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorites}
      onKeyDown={toggleFavorites}
      className='
        cursor-pointer 
        group/item 
        w-6 lg:w-10
        h-6 lg:h-10 
        border-slate-100 border-2 
        rounded-full 
        flex 
        justify-center 
        items-center 
        transition
        hover:border-slate-300
      '
    >
      <Icon
        className='text-slate-100'
        size={16}
      />
    </div>
  );
};

export default FavoriteButton;
