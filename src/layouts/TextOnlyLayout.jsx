import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import css from './TextOnlyLayout.scss';

/**
 * @author w.glanzer, 19.01.2019
 */
export default props => (
  <div className={css.rootContainer}>
    <Header fixedTop withLogo />
    <Container>{props.children}</Container>
    <Footer fixedBottom />
  </div>
);