import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import _ from 'lodash';
import css from './ResultItem.scss';

/**
 * @author w.glanzer, 10.02.2019
 */
class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.getI18NAvailability = this.getI18NAvailability.bind(this);
    this.getFormattedPrice = this.getFormattedPrice.bind(this);
  }

  getI18NAvailability() {
    let { availability } = this.props.data;
    if (!availability)
      availability = 'NOTSET';
    return this.context.t('availability')[availability];
  }

  getFormattedPrice() {
    const { lang, data: { availability, price } } = this.props;
    if (availability === 'unavailable')
      return '';

    const formatter = new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    });

    return formatter.format(price || 0);
  }

  render() {
    const { image, name, source, address, availability } = this.props.data;
    return (
      <Card className={css.container}>
        <Image src={image} wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            {_.truncate(name, {
              length: 45,
              separator: ' ',
            })}
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <span className={css.market}>
            <b>{source}</b>
            <br />
            {address ? address.split('\n').map((item, key) => (
              <React.Fragment key={key}>
                {item}
                <br />
              </React.Fragment>
            )) : ''}
          </span>
        </Card.Content>
        <Card.Content extra>
          <div className={`${css.status} ${availability}`}>
            <span className={css.dot} />
            <span className={css.availability}>{this.getI18NAvailability()}</span>
            <span className={css.price}>{this.getFormattedPrice()}</span>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

ResultItem.contextTypes = {
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  lang: state.i18nState.lang,
});

export default connect(mapStateToProps)(ResultItem);
