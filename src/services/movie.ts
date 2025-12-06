import { Query } from 'appwrite';
import { tablesDB, ID } from '@/lib/appwrite';
import type { Movie, TrendingRow } from '@/types/movie';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;

export const getTrendingMovies = async (): Promise<TrendingRow[]> => {
  try {
    const result = await tablesDB.listRows<TrendingRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.limit(5), Query.orderDesc('count')],
    });

    return result.rows;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown Appwrite error in updateSearchCount');
  }
};

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const { rows } = await tablesDB.listRows<TrendingRow>({
      databaseId: DATABASE_ID,
      tableId: TABLE_ID,
      queries: [Query.equal('search_term', searchTerm)],
    });

    if (rows.length > 0) {
      const row = rows[0];

      if (!row) {
        throw new Error(
          'Invariant violation: row is undefined despite rows.length > 0',
        );
      }

      await tablesDB.updateRow<TrendingRow>({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: row.$id,
        data: {
          count: row.count + 1,
        },
      });
    } else {
      await tablesDB.createRow<TrendingRow>({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: {
          search_term: searchTerm,
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        },
      });
    }
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error('Unknown Appwrite error in updateSearchCount');
  }
};
