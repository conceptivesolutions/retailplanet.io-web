import * as React from 'react';
import { Image } from 'react-bootstrap';
import css from './ResultItem.scss';

/**
 * props.data = Daten-Objekt
 *
 * @author w.glanzer, 10.02.2019
 */
export default class ResultItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderRating = this.renderRating.bind(this);
  }

  renderRating() {
    const rating = this.props.data.rating || 0;
    const resultRatingArr = [];
    for (let i = 0; i < rating; i++) resultRatingArr.push((i + 1 <= rating) ? 100 : 50);
    for (let i = resultRatingArr.length; i < 5; i++) resultRatingArr.push(0);

    return (
      <div className="mt-auto mb-auto">
        {resultRatingArr.map((pValue, pIndex) => {
          switch (pValue) {
            case 100:
              return <span key={pIndex} className={`${css.ratingFull} fa fa-star`} />;
            case 50:
              return <span key={pIndex} className={`${css.ratingHalf} fa fa-star-half-alt`} />;
            default:
              return <span key={pIndex} className={`${css.ratingEmpty} fa fa-star`} />;
          }
        })}
        <span className={css.ratingCount}>
          {' '}
          (
          {this.props.data.ratingCount}
          )
        </span>
      </div>
    );
  }

  render() {
    return (
      <div className={`${css.container} d-inline-flex flex-column border rounded shadow ${this.props.className || ''}`}>
        <div className={css.imageWrapper}>
          <Image className={css.image} src={this.props.data.image} />
        </div>
        <span className={css.title}><h5>{this.props.data.name}</h5></span>
        <div className={css.market}>
          <span className={css.price}>
            {this.props.data.price}
            {' '}
            €
          </span>
          {' '}
          bei
          {this.props.data.source}
        </div>
        {this.renderRating()}
      </div>
    );
  }
}
