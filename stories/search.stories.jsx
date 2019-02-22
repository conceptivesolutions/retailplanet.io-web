import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Searchbar from '../src/components/search/Searchbar';
import CountrySelection from '../src/components/search/CountrySelection';
import { withI18N, withReduxStore } from '../.storybook/decorators';

storiesOf('Search', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore)
  .add('Searchbar', () => <Searchbar />)
  .add('Country Selection', () => <CountrySelection />);
