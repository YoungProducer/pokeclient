import { FunctionComponent, useMemo } from 'react';
import { PokemonResponse } from '../../api';

import styles from './styles.module.css';
import { toTitle } from '../../utils/toTitle';
import { colors } from './colors';

interface TagsProps {
  tags: string[];
}

const Tags: FunctionComponent<TagsProps> = ({ tags }) => (
  <div className={styles['tag-wrapper']}>
    {tags.map((tag) => (
      <span
        key={tag}
        className={styles.tag}
        style={{ backgroundColor: colors[tag] }}
      >
        {tag}
      </span>
    ))}
  </div>
);

export const Card: FunctionComponent<PokemonResponse> = ({
  name,
  sprites,
  types,
}) => {
  const imgPath = sprites.other['official-artwork'].front_default;

  const tags = useMemo(() => types.map((type) => type.type.name), [types]);

  return (
    <div className={styles.container}>
      <img src={imgPath} className={styles.image} />
      <p className={styles.name}>{toTitle(name)}</p>
      <Tags tags={tags} />
    </div>
  );
};
