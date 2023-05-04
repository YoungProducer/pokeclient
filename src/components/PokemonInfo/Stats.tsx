import { FunctionComponent, useMemo } from 'react';
import { PokemonStat } from '../../api';

import styles from './styles.module.css';

export interface StatsProps {
  stats: PokemonStat[];
}

export const Stats: FunctionComponent<StatsProps> = ({ stats }) => {
  const statsData = useMemo(
    () =>
      stats.map((stat) => ({
        name: stat.stat.name,
        value: stat.base_stat,
      })),
    [stats],
  );

  return (
    <table className={styles.table}>
      <tbody>
        {statsData.map(({ name, value }) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
