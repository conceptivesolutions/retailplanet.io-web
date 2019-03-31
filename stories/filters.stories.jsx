import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withI18N, withReduxStore } from '../.storybook/decorators';

const Wrapper = props => (
  <div className="bg-red h-100">
    <style jsx>
      {`
          html,
          body,
          #root {
            height: 100%;
          }
          
          #root {
            width: 20rem;
            background: #F8F8F8;
            padding: 0.5rem;
          }
      `}
    </style>

    {props.children}
  </div>
);

storiesOf('Filters', module)
  .addDecorator(withI18N)
  .addDecorator(withReduxStore())
  .addDecorator(pStory => <Wrapper>{pStory()}</Wrapper>);
