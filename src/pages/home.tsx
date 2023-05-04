import { FunctionComponent, useRef, useState } from 'react';

import { PokemonsList } from '../components/PokemonsList';

import styles from './styles.module.css';
import { PokemonResponse } from '../api';
import { PokemonInfo } from '../components/PokemonInfo';

export const HomePage: FunctionComponent = () => {
  const [offset, setOffset] = useState<number>(0);
  const limit = useRef(12).current;

  const [canLoadMore, setCanLoadMore] = useState<boolean>(true);

  const [pokemonInfo, setPokemonInfo] = useState<PokemonResponse | null>(null);

  const loadMore = () => canLoadMore && setOffset((s) => s + limit);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <div className={styles.content}>
        <div className={styles.list}>
          <PokemonsList
            offset={offset}
            limit={limit}
            selectPokemon={setPokemonInfo}
            setCanLoadMore={setCanLoadMore}
          />
          <button
            className={styles.button}
            onClick={loadMore}
            disabled={!canLoadMore}
          >
            Load More
          </button>
        </div>
        <div className={styles.info}>
          <PokemonInfo info={pokemonInfo} />
        </div>
      </div>
    </div>
  );
};
