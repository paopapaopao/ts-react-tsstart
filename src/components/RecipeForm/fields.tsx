import { Badge, Button, Card, CardAction, CardHeader, CardTitle } from '../ui';
import { TextField } from './TextField';
import { NumberField } from './NumberField';
import { TagListField } from './TagListField';

export const NameField = () => (
  <TextField name='name' label='Name' placeholder='Enter name' />
);

export const CuisineField = () => (
  <TextField name='cuisine' label='Cuisine' placeholder='Enter cuisine' />
);

export const PrepTimeField = () => (
  <NumberField
    name='prepTime'
    label='Prep Time'
    placeholder='Enter preparation time'
    suffix='mins'
  />
);

export const CookTimeField = () => (
  <NumberField
    name='cookTime'
    label='Cook Time'
    placeholder='Enter cook time'
    suffix='mins'
  />
);

export const ServingsField = () => (
  <NumberField name='servings' label='Servings' placeholder='Enter servings' />
);

export const CaloriesField = () => (
  <NumberField
    name='calories'
    label='Calories'
    placeholder='Enter calories'
    suffix='/serving'
  />
);

export const IngredientsField = () => (
  <TagListField
    name='ingredients'
    label='Ingredients'
    placeholder='Enter ingredients'
    unique
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

export const TagsField = () => (
  <TagListField
    name='tags'
    label='Tags'
    placeholder='Enter tags'
    unique
    itemsClassName='flex flex-wrap gap-2'
    renderItem={(value, index, onRemove) => (
      <li key={`${index}-${value}`}>
        <Badge className='px-4 py-4'>
          {value}
          <span className='cursor-pointer' onClick={onRemove}>
            X
          </span>
        </Badge>
      </li>
    )}
  />
);

export const SubmitButton = ({ label = 'Submit' }: { label?: string }) => (
  <Button type='submit' className='mbs-8 col-start-2'>
    {label}
  </Button>
);
