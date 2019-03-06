import * as React from 'react';
import IndexLayout from '../src/layouts/IndexLayout';
import Searchbar from '../src/components/search/Searchbar';
import css from './index.scss';
import CountrySelection from '../src/components/search/CountrySelection';
import withAuth from '../src/auth/withAuth';

const Index = () => (
  <IndexLayout>
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-12">
          <div className={css.phrase}>
          Search for specific Items.
            <br />
            <b>Buy from a local store</b>
          </div>
          <Searchbar>
            <CountrySelection />
          </Searchbar>
        </div>
      </div>
    </div>
  </IndexLayout>
);

export default withAuth(Index);
