import { FunctionComponent } from 'react';

import { PokemonsList } from '../components/PokemonsList';

export const HomePage: FunctionComponent = () => {
  return (
    <div>
      <PokemonsList />
    </div>
  );
};
