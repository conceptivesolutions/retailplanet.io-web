import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextOnlyLayout from '../src/layouts/TextOnlyLayout';
import withAuth from '../src/auth/withAuth';

const Imprint = (props, context) => (
  <TextOnlyLayout>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{
      __html: context.t('imprint').default,
    }} />
  </TextOnlyLayout>
);

Imprint.contextTypes = {
  t: PropTypes.func.isRequired,
};

// noinspection JSUnusedGlobalSymbols
export default withAuth(connect()(Imprint));
