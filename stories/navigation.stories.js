import * as React from 'react';
import {storiesOf} from '@storybook/react';
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';
import '../static/styles/styles.scss';

storiesOf('Navigation', module)
    .add('Page Header with Logo', () => (
        <Header withLogo/>
    ))
    .add('Page Header with Logo (fixed top)', () => (
        <Header withLogo fixedTop/>
    ))
    .add('Page Header with Searchbar', () => (
        <Header withLogo withSearch/>
    ))
    .add('Page Footer', () => (
        <Footer/>
    ))
;