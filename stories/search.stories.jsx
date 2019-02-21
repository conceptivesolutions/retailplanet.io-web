import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Searchbar from '../src/components/search/Searchbar';
import CountrySelection from '../src/components/search/CountrySelection';

storiesOf('Search', module)
  .add('Searchbar', () => <Searchbar />)
  .add('Country Selection', () => <CountrySelection />);
