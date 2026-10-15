import { Button } from '../ui';

type Props = { label?: string };

export const Submit = ({ label = 'Submit' }: Props): React.JSX.Element => {
  return (
    <Button type='submit' className='mbs-8 col-start-2'>
      {label}
    </Button>
  );
};
