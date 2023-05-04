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
  setIsLoading: (loading: boolean) => void;
}

export const PokemonsList: FunctionComponent<PokemonsListProps> = ({
  offset,
  limit,
  selectedFilters,
  selectPokemon,
  setCanLoadMore,
  addFilterOptions,
  setIsLoading,
}) => {
  const [renderData, setRenderData] = useState<PokemonResponse[]>([]);

  const filteredData = useMemo(() => {
    if (selectedFilters.length === 0) return renderData;

    return renderData.filter((element) =>
      element.types.some((type) => selectedFilters.includes(type.type.name)),
    );
  }, [renderData, selectedFilters]);

  // that might a little overhead, but when I realized, it was to late,
  // didn't want to spend more time to rewrite all the stuff
  //
  // the reason why I've implemented all the logic in `onSuccess`
  // is beacause I don't really like `useEffect`
  // and trying to avoid it as much as possible
  // so all my code works on callback and easier like to debug and understand the logic(I hope so)
  //
  // I didn't use all the power of react-query, but let's say that for "future"
  // honestly, we could use `useQuery` inside of each card and we would get allmost same result
  // but for my subjective opinion it was better to do as i did
  // plus, we get a little piece of optimization
  // because it fetches the pokemon's data only for recently loaded pokemons
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

        setIsLoading(true);

        fetchPokemonData(results)
          .then((data) => {
            setRenderData((state) => state.concat(data));

            const newFilterOptions = uniqueArray(
              data.flatMap((el) => el.types.map((type) => type.type.name)),
            );

            addFilterOptions(newFilterOptions);
          })
          .catch(console.error)
          .finally(() => setIsLoading(false));
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
