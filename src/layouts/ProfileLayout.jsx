import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import css from './ProfileLayout.scss';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

/**
 * Layout for the profile page
 *
 * @author w.glanzer, 04.05.2019
 */
export default ({ nav, children }) => (
  <div className={css.page}>
    <Header withLogo />
    <Container className={css.content}>
      <Grid>
        <Grid.Column width={4}>
          {nav}
        </Grid.Column>
        <Grid.Column stretched width={12}>
          {children}
        </Grid.Column>
      </Grid>
    </Container>
    <Footer withLogo />
  </div>
);
