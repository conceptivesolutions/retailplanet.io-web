import React from 'react';
import { storiesOf } from '@storybook/react';
import { withI18N, withReduxStore } from '../.storybook/decorators';
import PriceFilter from '../src/components/filters/price/PriceFilter';
import ResultFilters from '../src/components/filters/ResultFilters';
import GeoFilter from '../src/components/filters/geo/GeoFilter';
import './filters.stories.scss';
import AvailabilityFilter from '../src/components/filters/availability/AvailabilityFilter';

const mockedStore = {
  search: {
    filters: {
      editing: false,
    },
    results: {
      filters: {
        price: [0, 100],
      },
    },
  },
  i18nState: {
    lang: 'de',
  },
};

storiesOf('Filters', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore(mockedStore))
  .addDecorator(pStory => <div className="filters">{pStory()}</div>)
  .add('All', () => (<ResultFilters />))
  .add('Availability', () => (<AvailabilityFilter />))
  .add('Price', () => (<PriceFilter />))
  .add('Location', () => (<GeoFilter />));
