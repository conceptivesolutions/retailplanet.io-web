import * as React from 'react';
import {storiesOf} from '@storybook/react';
import '../static/styles/styles.scss';
import ProfileSmall from '../components/navigation/profile/ProfileSmall';
import {Nav, Navbar} from 'react-bootstrap';

function mockSession()
{
  return {
    user: {
      name: 'TestUser'
    }
  };
}

storiesOf('Profile', module)
    .add('Profile in Header', () => (
        <Navbar bg="light">
          <Nav>
            <Nav.Item>
              <ProfileSmall session={mockSession()}/>
            </Nav.Item>
          </Nav>
        </Navbar>
    ));