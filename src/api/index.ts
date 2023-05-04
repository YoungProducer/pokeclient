import axios, { AxiosError } from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { urlBuilder } from '../utils/urlBuilder';

interface GetPokemonsPathProps {
  offset?: number;
  limit?: number;
}

export interface GetPokemonsData {
  name: string;
  url: string;
}

export interface GetPokemonsResponse {
  results: GetPokemonsData[];
}

const GetPokemonsPath = (
  { offset = 0, limit = 12 }: GetPokemonsPathProps = { offset: 0, limit: 12 },
) => urlBuilder('https://pokeapi.co/api/v2/pokemon', { offset, limit });

const getPokemonsApi = async (props?: GetPokemonsPathProps) =>
  await axios.get<GetPokemonsResponse>(GetPokemonsPath(props));

export const useGetPokemons = (
  props?: GetPokemonsPathProps,
  options?: Omit<
    UseQueryOptions<GetPokemonsResponse, AxiosError>,
    'queryKey' | 'queryFn'
  >,
) =>
  useQuery(
    GetPokemonsPath(props),
    () => getPokemonsApi(props).then((res) => res.data),
    options,
  );

export interface GetPokemonPathProps {
  name: string;
}

export interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export interface PokemonResponse {
  name: string;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
}

const GetPokemonPath = ({ name }: GetPokemonPathProps) =>
  `https://pokeapi.co/api/v2/pokemon/${name}`;

export const getPokemonApi = async (props: GetPokemonPathProps) =>
  await axios.get<PokemonResponse>(GetPokemonPath(props));

export const useGetPokemon = (props: GetPokemonPathProps) =>
  useQuery(GetPokemonPath(props), () =>
    getPokemonApi(props).then((res) => res.data),
  );
