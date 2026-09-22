import type { Updater } from '@tanstack/react-form';

export const isInvalid = (state: {
  meta: { isTouched: boolean; isValid: boolean };
}) => (state.meta.isTouched ? !state.meta.isValid : undefined);

export const handleKeyDown = ({
  isUnique,
  onChange,
  setState,
}: {
  isUnique: boolean;
  onChange: (updater: Updater<string[]>) => void;
  setState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;

    event.preventDefault();

    const value = event.currentTarget.value.trim();

    if (value === '') return;

    onChange((previousValue) => {
      if (previousValue.includes(value) && isUnique) {
        return previousValue;
      }

      return [...previousValue, value];
    });

    setState('');
  };
};

export const handleInputChange = <T>({
  onChange,
  parse,
}: {
  onChange: (value: T) => void;
  parse: (value: string) => T;
}) => {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(parse(event.target.value));
  };
};

export const handleValueChange = <T>(onChange: (value: T) => void) => {
  return (value: T | null) => {
    if (value === null) return;

    onChange(value);
  };
};

export const handleClick = ({
  index,
  onChange,
}: {
  index: number;
  onChange: (updater: Updater<string[]>) => void;
}) => {
  return () => {
    onChange((value) => value.filter((_, i) => i !== index));
  };
};

export const inputClassNames = [
  'aria-[invalid=false]:ring-3',
  'aria-[invalid=false]:ring-green-500/30',
  'aria-[invalid=false]:border-green-500',
].join(' ');
