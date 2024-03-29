import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ResultItem from '../src/components/result/ResultItem';
import { withI18N, withReduxStore } from '../.storybook/decorators';
import ResultPagination from '../src/components/result/ResultPagination';
import ResultList from '../src/components/result/ResultList';
import Navigation from '../src/components/search/Navigation';
import { Availability } from '../src/reducers/searchReducer';

function mockItemData() {
  return {
    name: 'Rolex Submariner with really large text',
    image: 'https://chronexttime.imgix.net/M/0/M02357/M02357_1_det1.png?w=800&auto=format&fm=jpg&q=75&usm=30&usmrad=1&h=800&fit=clamp',
    price: 7760.95,
    source: 'Media Markt',
    availability: Availability.AVAILABLE,
    address: 'Ludwig Erhard Strasse 9\n84034 Landshut',
    rating: 4.99,
    ratingCount: 50,
  };
}

function mockResultItemsArray(size) {
  const items = [];
  for (let i = 0; i < size; i++)
    items.push(mockItemData());
  return items;
}

const mockedStore = {
  search: {
    results: {
      query: 'My Dummy Query',
      total: 9876,
      page: {
        current: 1,
        count: 5,
      },
      items: mockResultItemsArray(20),
    },
  },
  i18nState: {
    lang: 'de',
  },
};

storiesOf('Result', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore(mockedStore))
  .add('Navigation', () => <Navigation />)
  .add('Page', () => (
    <React.Fragment>
      <ResultList />
      <ResultPagination />
    </React.Fragment>
  ))
  .add('Item', () => <ResultItem data={mockItemData()} />)
  .add('Pagination', () => <ResultPagination />);
