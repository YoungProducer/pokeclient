import { FunctionComponent, useRef, useState } from 'react';

import { PokemonsList } from '../components/PokemonsList';

import styles from './styles.module.css';
import { PokemonResponse } from '../api';
import { PokemonInfo } from '../components/PokemonInfo';
import { uniqueArray } from '../utils/uniqueArray';
import { Filter } from '../components/Filter';

export const HomePage: FunctionComponent = () => {
  const [offset, setOffset] = useState<number>(0);
  const limit = useRef(12).current;

  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  const [pokemonInfo, setPokemonInfo] = useState<PokemonResponse | null>(null);

  const [filterOptions, setFilterOptions] = useState<string[]>([]);

  const [selectedFilter, setSelectedFilters] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const clearInfo = () => setPokemonInfo(null);

  const loadMore = () => canLoadMore && setOffset((s) => s + limit);

  const addFilterOptions = (options: string[]) =>
    setFilterOptions((state) => uniqueArray(state.concat(options)));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.list}>
          <div className={styles.filter}>
            <Filter options={filterOptions} onUpdate={setSelectedFilters} />
          </div>
          <PokemonsList
            offset={offset}
            limit={limit}
            selectPokemon={setPokemonInfo}
            setCanLoadMore={setCanLoadMore}
            addFilterOptions={addFilterOptions}
            selectedFilters={selectedFilter}
            setIsLoading={setIsLoading}
          />
          <button
            className={styles.button}
            onClick={loadMore}
            disabled={!canLoadMore || isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        </div>
        <div className={styles.info}>
          <PokemonInfo info={pokemonInfo} onClear={clearInfo} />
        </div>
      </div>
    </div>
  );
};
