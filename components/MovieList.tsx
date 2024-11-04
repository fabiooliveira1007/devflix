import MovieCard from './MovieCard';
import { isEmpty } from 'lodash';

interface MovieListProps {
  data: Record<string, string>[];
  title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) return null;

  return (
    <div className='px-4 sm:px-8 mt-4 space-y-8'>
      <div>
        <p
          className='
            text-slate-100
            text-md md:text-xl lg:text-2xl 
            font-semibold 
            mb-4
          '
        >
          {title}
        </p>
        <div className={`grid gap-4 ${data.length > 1 ? 'grid-cols-[repeat(auto-fit,minmax(180px,1fr))]' : 'grid-cols-[repeat(auto-fill,minmax(200px,1fr))]'  }`}>
          {data.map(movie => (
            <MovieCard
              key={movie.id}
              data={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
