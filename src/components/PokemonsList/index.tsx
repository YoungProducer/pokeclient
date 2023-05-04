import { FunctionComponent, useMemo, useRef, useState } from 'react';
import {
  GetPokemonsData,
  PokemonResponse,
  getPokemonApi,
  useGetPokemons,
} from '../../api';
import { Card } from '../Card';

const fetchPokemonData = async (
  data: GetPokemonsData[],
): Promise<PokemonResponse[]> => {
  return (await Promise.all(data.map((el) => getPokemonApi(el)))).map(
    (res) => res.data,
  );
};

export const PokemonsList: FunctionComponent = () => {
  const [offset, setOffset] = useState<number>(0);

  const limit = useRef(12).current;

  const [renderData, setRenderData] = useState<PokemonResponse[]>([]);

  useGetPokemons(
    {
      offset,
      limit,
    },
    {
      onSuccess({ results }) {
        if (results.length === renderData.length) return;

        fetchPokemonData(results.slice(-limit))
          .then(setRenderData)
          .catch(console.error);
      },
    },
  );

  console.log({ renderData });

  const filteredData = useMemo(() => renderData, [renderData]);

  return (
    <div>
      {filteredData.map((el) => (
        <Card key={el.name} {...el} />
      ))}
    </div>
  );
};
