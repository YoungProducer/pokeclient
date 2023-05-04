import { FunctionComponent, useRef } from 'react';
import classNames from 'classnames';

import styles from './styles.module.css';

export interface FilterProps {
  options: string[];
  onUpdate: (selectedOptions: string[]) => void;
}

export const Filter: FunctionComponent<FilterProps> = ({
  options,
  onUpdate,
}) => {
  const selectedOptions = useRef(new Set<string>()).current;

  const onOptionSelect = (option: string) => () => {
    if (selectedOptions.has(option)) {
      selectedOptions.delete(option);
    } else {
      selectedOptions.add(option);
    }

    onUpdate([...selectedOptions]);
  };

  const isOptionSelected = (option: string) => selectedOptions.has(option);

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <div
          key={option}
          onClick={onOptionSelect(option)}
          className={classNames(styles.option, {
            [styles['option-selected']]: isOptionSelected(option),
          })}
        >
          {option}
        </div>
      ))}
    </div>
  );
};
