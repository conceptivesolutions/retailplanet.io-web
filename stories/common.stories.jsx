import { storiesOf } from '@storybook/react';
import React from 'react';
import configureStore from 'redux-mock-store';
import { withI18N, withReduxStore } from '../.storybook/decorators';
import Language from '../src/components/header/lang/Language';
import ProfileSmall from '../src/components/header/profile/HeaderProfile';
import LoadingIndicator from '../src/components/loading/LoadingIndicator';

const mockedStore = configureStore()({
  user: {
    profile: {
      id: 'meineUserID',
      name: 'meinName',
      username: 'myUsername',
    },
    tokens: {
      accessToken: 'accessToken',
    },
  },
  i18nState: {
    lang: 'de',
  },
});

storiesOf('Common', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore(mockedStore))
  .add('Language', () => (
    <Language />
  ))
  .add('Loading Indicator', () => (
    <LoadingIndicator />
  ))
  .add('Profile', () => (
    <ProfileSmall disableLogin />
  ))
  .add('Profile (logged in)', () => (
    <ProfileSmall />
  ));
