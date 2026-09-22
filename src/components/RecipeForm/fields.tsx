import { Button, Card, CardAction, CardHeader, CardTitle } from '../ui';
import { TagListField } from './TagListField';

export const InstructionsField = () => (
  <TagListField
    name='instructions'
    label='Instructions'
    placeholder='Enter instructions'
    renderItem={(value, index, onRemove) => (
      <li key={`${index}-${value}`}>
        <Card className='py-0'>
          <CardHeader className='flex items-center'>
            <CardTitle className='flex-1'>{value}</CardTitle>
            <CardAction>
              <Button variant='link' onClick={onRemove}>
                X
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </li>
    )}
  />
);

export const SubmitButton = ({ label = 'Submit' }: { label?: string }) => (
  <Button type='submit' className='mbs-8 col-start-2'>
    {label}
  </Button>
);
