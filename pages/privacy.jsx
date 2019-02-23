import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextOnlyLayout from '../src/layouts/TextOnlyLayout';

const Privacy = (props, context) => (
  <TextOnlyLayout>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{
      __html: context.t('privacy'),
    }}
    />
  </TextOnlyLayout>
);

Privacy.contextTypes = {
  t: PropTypes.func.isRequired,
};

// noinspection JSUnusedGlobalSymbols
export default connect()(Privacy);
