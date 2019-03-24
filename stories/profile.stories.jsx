import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Nav, Navbar } from 'react-bootstrap';
import ProfileSmall from '../src/components/navigation/profile/ProfileSmall';
import { withI18N, withReduxStore } from '../.storybook/decorators';

storiesOf('Profile', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore())
  .add('Profile in Header', () => (
    <Navbar bg="light">
      <Nav>
        <Nav.Item>
          <ProfileSmall />
        </Nav.Item>
      </Nav>
    </Navbar>
  ));
