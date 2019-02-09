import * as React from 'react';
import {storiesOf} from '@storybook/react';
import '../static/styles/styles.scss';
import Searchbar from "../components/search/Searchbar";
import CountrySelection from "../components/search/CountrySelection";

storiesOf('Search', module)
    .add('Searchbar', () => (
        <Searchbar/>
    ))
    .add('Country Selection', () => (
        <CountrySelection/>
    ));