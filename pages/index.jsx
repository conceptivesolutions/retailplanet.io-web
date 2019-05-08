import * as React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import IndexLayout from '../src/layouts/IndexLayout';
import Searchbar from '../src/components/search/Searchbar';
import css from './index.scss';
import CountrySelection from '../src/components/search/CountrySelection';
import withAuth from '../src/auth/withAuth';

const Index = () => (
  <IndexLayout>
    <Grid>
      <Grid.Row centered columns={1}>
        <Grid.Column>
          <Image className={css.phrase} src="/static/phrase_1000.png" />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered columns={2}>
        <Grid.Column>
          <Searchbar className={css.searchBar}>
            <CountrySelection />
          </Searchbar>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </IndexLayout>
);

export default withAuth(Index);
