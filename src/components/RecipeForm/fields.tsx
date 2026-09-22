import { Button } from '../ui';

export const SubmitButton = ({ label = 'Submit' }: { label?: string }) => (
  <Button type='submit' className='mbs-8 col-start-2'>
    {label}
  </Button>
);
