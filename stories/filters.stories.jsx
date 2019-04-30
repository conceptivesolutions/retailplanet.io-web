import React from 'react';
import { storiesOf } from '@storybook/react';
import { withI18N, withReduxStore } from '../.storybook/decorators';
import GeoFilter from '../src/components/filters/geo/GeoFilter';
import './filters.stories.scss';

storiesOf('Filters', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore())
  .add('Geo Location', () => (<GeoFilter />));
