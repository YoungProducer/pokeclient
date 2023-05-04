import { FunctionComponent } from 'react';
import { PokemonResponse } from '../../api';

export const Card: FunctionComponent<PokemonResponse> = ({
  name,
  sprites,
  types,
}) => {
  const imgPath = sprites.other['official-artwork'].front_default;

  return (
    <div>
      <img src={imgPath} />
      <p>{name}</p>
      {types.map((type) => (
        <span key={type.type.name}>{type.type.name}</span>
      ))}
    </div>
  );
};
