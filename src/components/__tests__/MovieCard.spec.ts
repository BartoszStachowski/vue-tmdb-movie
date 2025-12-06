import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from '@/components/MovieCard.vue';
import type { Movie } from '@/types/movie';

const createMovie = (overrides: Partial<Movie> = {}): Movie => ({
  adult: false,
  backdrop_path: null,
  genre_ids: [],
  id: 1,
  original_language: 'en',
  original_title: 'Inception',
  overview: 'Test overview',
  popularity: 100,
  poster_path: '/inception.jpg',
  release_date: '2010-07-16',
  title: 'Inception',
  video: false,
  vote_average: 8.789,
  vote_count: 1234,
  ...overrides,
});

describe('MovieCard Component', () => {
  const movie = createMovie({
    title: 'Parasite',
    poster_path: null,
    release_date: '',
  });
  const wrapper = mount(MovieCard, {
    props: { movie },
  });

  it('renders movie title', () => {
    expect(wrapper.text()).toContain('Parasite');
  });

  it('falls back to /no-poster.png when poster_path is null', () => {
    const posterImg = wrapper.get('img');
    expect(posterImg.attributes('src')).toBe('/no-poster.png');
  });

  it('sets correct alt text for poster', () => {
    const posterImg = wrapper.get('img');
    expect(posterImg.attributes('alt')).toBe(`Poster of ${movie.title}`);
  });

  it('displays "N/A" when release_date is an empty string', () => {
    expect(wrapper.text()).toContain('N/A');
  });
});
