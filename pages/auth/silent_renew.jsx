import * as React from 'react';
import { processSilentRenew } from 'redux-oidc';
import './silent_renew.scss';

// noinspection JSUnusedGlobalSymbols
export default class SilentRenew extends React.Component {
  componentDidMount() {
    processSilentRenew();
  }

  render() {
    return (<div />);
  }
}
