import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import css from './IndexLayout.scss';

/**
 * Layout für die Index-Seite mit der Haupt-Suche
 *
 * @author w.glanzer, 14.01.2019
 */
export default ({ children }) => (
  <div className={css.rootContainer}>
    <Header fixedTop withLogo />
    <Container className="h-100">{children}</Container>
    <Footer fixedBottom />
  </div>
);
