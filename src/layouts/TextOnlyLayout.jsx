import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import css from './TextOnlyLayout.scss';

/**
 * @author w.glanzer, 19.01.2019
 */
export default ({ children }) => (
  <div className={css.rootContainer}>
    <Header fixedTop withLogo />
    <Container>{children}</Container>
    <Footer fixedBottom />
  </div>
);
