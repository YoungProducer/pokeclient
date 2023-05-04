import { FunctionComponent, useRef, useState } from 'react';

import { PokemonsList } from '../components/PokemonsList';

import styles from './styles.module.css';

export const HomePage: FunctionComponent = () => {
  const [offset, setOffset] = useState<number>(0);
  const limit = useRef(12).current;

  const loadMore = () => setOffset((s) => s + limit);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Pokedex</h1>
      </header>
      <div>
        <PokemonsList offset={offset} limit={limit} />
        <button className={styles.button} onClick={loadMore}>
          Load More
        </button>
      </div>
    </div>
  );
};
