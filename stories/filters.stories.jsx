import { storiesOf } from '@storybook/react';
import { withI18N, withReduxStore } from '../.storybook/decorators';

storiesOf('Filters', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore());
