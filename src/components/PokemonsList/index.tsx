import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import {
  GetPokemonsData,
  PokemonResponse,
  getPokemonApi,
  useGetPokemons,
} from '../../api';
import { Card } from '../Card';
import styles from './styles.module.css';

const fetchPokemonData = async (
  data: GetPokemonsData[],
): Promise<PokemonResponse[]> => {
  return (await Promise.all(data.map((el) => getPokemonApi(el)))).map(
    (res) => res.data,
  );
};

export interface PokemonsListProps {
  offset: number;
  limit: number;
  selectPokemon: (info: PokemonResponse) => void;
}

export const PokemonsList: FunctionComponent<PokemonsListProps> = ({
  offset,
  limit,
  selectPokemon,
}) => {
  const [renderData, setRenderData] = useState<PokemonResponse[]>([]);

  const filteredData = useMemo(() => renderData, [renderData]);

  useGetPokemons(
    {
      offset,
      limit,
    },
    {
      onSuccess({ results }) {
        // check if last entry of fetched pokemons already exists
        if (
          renderData.length > 0 &&
          results.length > 0 &&
          renderData.slice(-1)[0].name === results.slice(-1)[0].name
        )
          return;

        fetchPokemonData(results)
          .then((data) => setRenderData((state) => state.concat(data)))
          .catch(console.error);
      },
    },
  );

  const onSelect = useCallback(
    (info: PokemonResponse) => () => selectPokemon(info),
    [selectPokemon],
  );

  return (
    <div className={styles.container}>
      {filteredData.map((el) => (
        <Card key={el.name} {...el} onClick={onSelect(el)} />
      ))}
    </div>
  );
};
