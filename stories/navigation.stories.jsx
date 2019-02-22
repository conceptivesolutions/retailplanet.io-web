import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/navigation/Header';
import Footer from '../src/components/navigation/Footer';
import css from './navigation.stories.scss';
import { withI18N, withReduxStore } from '../.storybook/decorators';

storiesOf('Navigation', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore)
  .add('Page Header with Logo', () => (
    <div className={css.headerPane}>
      <Header withLogo />
    </div>
  ))
  .add('Page Header with Logo (fixed top)', () => (
    <div className={css.headerPane}>
      <Header withLogo fixedTop />
    </div>
  ))
  .add('Page Header with Searchbar', () => (
    <div className={css.headerPane}>
      <Header withLogo query="Encoded%20Value" />
    </div>
  ))
  .add('Page Footer', () => <Footer />);
