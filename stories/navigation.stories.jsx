import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../src/components/header/Header';
import Footer from '../src/components/footer/Footer';
import css from './navigation.stories.scss';
import { withI18N, withReduxStore } from '../.storybook/decorators';

storiesOf('Navigation', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore())
  .add('Page Header (Index)', () => (
    <div className={css.headerPane}>
      <Header withLogo />
    </div>
  ))
  .add('Page Header (Results)', () => (
    <div className={css.headerPane}>
      <Header withSearch />
    </div>
  ))
  .add('Page Footer', () => <Footer withLogo />);
