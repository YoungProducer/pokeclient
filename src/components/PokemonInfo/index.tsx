import { FunctionComponent } from 'react';
import { PokemonResponse } from '../../api';

import styles from './styles.module.css';
import { toTitle } from '../../utils/toTitle';
import { Stats } from './Stats';

const getPrettifiedId = (id: number) => {
  const base = '#000';

  const stringId = String(id);

  return base.slice(0, -stringId.length) + stringId;
};

export interface PokemonInfoProps {
  info: PokemonResponse | null;
}

export const PokemonInfo: FunctionComponent<PokemonInfoProps> = ({ info }) => {
  if (!info)
    return (
      <div className={styles.container}>
        <p className={styles.name}>Select pokemon to see its info</p>
      </div>
    );

  const { id, name, sprites, stats } = info;

  const imgPath = sprites.other['official-artwork'].front_default;

  return (
    <div className={styles.container}>
      <img className={styles.image} src={imgPath} />
      <p className={styles.name}>
        {toTitle(name)} {getPrettifiedId(id)}
      </p>
      <Stats stats={stats} />
    </div>
  );
};
