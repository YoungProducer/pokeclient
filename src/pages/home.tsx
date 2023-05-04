import { FunctionComponent } from 'react';

import { PokemonsList } from '../components/PokemonsList';

import styles from './styles.module.css';

export const HomePage: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <PokemonsList />
    </div>
  );
};
