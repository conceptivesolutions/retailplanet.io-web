import * as React from 'react';
import {storiesOf} from '@storybook/react';
import '../static/styles/styles.scss';
import ResultItem from "../components/result/ResultItem";

function mockItemData()
{
    return {
        name: "Rolex Submariner",
        image: "https://chronexttime.imgix.net/M/0/M02357/M02357_1_det1.png?w=800&auto=format&fm=jpg&q=75&usm=30&usmrad=1&h=800&fit=clamp",
        price: 7760.95,
        source: "Media Markt",
        location: "Landshut",
        rating: 4.99,
        ratingCount: 50
    }
}

storiesOf('Search/Result', module)
    .add('Result Item', () => (
        <ResultItem data={mockItemData()}/>
    ));