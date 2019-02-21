import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Nav, Navbar } from 'react-bootstrap';
import ProfileSmall from '../src/components/navigation/profile/ProfileSmall';
import { withReduxStore } from '../.storybook/decorators';

// function mockSession() {
//   return {
//     user: {
//       name: 'TestUser',
//     },
//   };
// }

storiesOf('Profile', module)
  .addDecorator(withReduxStore)
  .add('Profile in Header', () => (
    <Navbar bg="light">
      <Nav>
        <Nav.Item>
          <ProfileSmall />
        </Nav.Item>
      </Nav>
    </Navbar>
  ));
