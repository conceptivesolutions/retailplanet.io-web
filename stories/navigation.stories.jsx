import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/header/Header';
import Footer from '../src/components/footer/Footer';
import { withI18N, withReduxStore } from '../.storybook/decorators';

const mockedStore = {
  search: {
    results: {
      query: 'My Dummy Query',
    },
  },
  i18nState: {
    lang: 'de',
  },
};

storiesOf('Navigation', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore(mockedStore))
  .add('Page Header (Index)', () => (
    <Header withLogo />
  ))
  .add('Page Header (Results)', () => (
    <Header withSearch />
  ))
  .add('Page Footer', () => <Footer withLogo />)
  .add('Page Footer (Results)', () => <Footer withLang />);
