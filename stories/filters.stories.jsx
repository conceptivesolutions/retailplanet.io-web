import React from 'react';
import { storiesOf } from '@storybook/react';
import { withI18N, withReduxStore } from '../.storybook/decorators';
import PriceFilter from '../src/components/filters/price/PriceFilter';
import ResultFilters from '../src/components/filters/ResultFilters';
import GeoFilter from '../src/components/filters/geo/GeoFilter';
import './filters.stories.scss';

storiesOf('Filters', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore())
  .addDecorator(pStory => <div className="filters">{pStory()}</div>)
  .add('All', () => (<ResultFilters />))
  .add('Price', () => (<PriceFilter />)) // todo does not show...
  .add('Location', () => (<GeoFilter />));
