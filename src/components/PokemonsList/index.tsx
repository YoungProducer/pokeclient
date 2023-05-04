import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import {
  GetPokemonsData,
  PokemonResponse,
  getPokemonApi,
  useGetPokemons,
} from '../../api';
import { Card } from '../Card';
import styles from './styles.module.css';
import { uniqueArray } from '../../utils/uniqueArray';

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
  selectedFilters: string[];
  selectPokemon: (info: PokemonResponse) => void;
  setCanLoadMore: (value: false) => void;
  addFilterOptions: (options: string[]) => void;
}

export const PokemonsList: FunctionComponent<PokemonsListProps> = ({
  offset,
  limit,
  selectedFilters,
  selectPokemon,
  setCanLoadMore,
  addFilterOptions,
}) => {
  const [renderData, setRenderData] = useState<PokemonResponse[]>([]);

  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return renderData;

    return renderData.filter((element) =>
      element.types.some((type) => selectedFilters.includes(type.type.name)),
    );
  }, [renderData, selectedFilters]);

  console.log({ selectedFilters, filteredData });

  useGetPokemons(
    {
      offset,
      limit,
    },
    {
      onSuccess({ results, next }) {
        if (!next) setCanLoadMore(false);

        // check if last entry of fetched pokemons already exists
        if (
          renderData.length > 0 &&
          results.length > 0 &&
          renderData.slice(-1)[0].name === results.slice(-1)[0].name
        )
          return;

        fetchPokemonData(results)
          .then((data) => {
            setRenderData((state) => state.concat(data));

            const newFilterOptions = uniqueArray(
              data.flatMap((el) => el.types.map((type) => type.type.name)),
            );

            addFilterOptions(newFilterOptions);
          })
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
