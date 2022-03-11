import { ReactElement } from 'react';
import { Text, SegmentGroup, Segment } from '@simplybusiness/mobius-core';
import styles from './Quote.module.css';

type Price = {
  amount: number;
  currency: string;
};

type Cover = {
  name: string;
  price: Price;
};

type QuoteProps = {
  reference: string;
  price: Price;
  insurer: string;
  covers: Cover[];
};

const Quote = (props: QuoteProps): ReactElement => {
  const { reference, price, insurer, covers } = props;

  return (
    <div className={styles.wrapper}>
      <SegmentGroup>
        <Segment colour="subtle">
          <div className={styles.row}>
            <Text variant="h2">{insurer}</Text>
            <Text variant="h4">£ {price.amount}</Text>
          </div>
        </Segment>
        <Segment>
          <div className={styles.row}>
            <Text variant="h4">Your ref:</Text>
            <Text variant="lead">{reference}</Text>
          </div>
        </Segment>
        <Segment>
          <Text variant="h4">Covers</Text>
          {covers.map(({ name, price }) => (
            <div key={name}>
              <Text variant="caption">
                <strong>{name}</strong>: £ {price.amount}
              </Text>
            </div>
          ))}
        </Segment>
      </SegmentGroup>
    </div>
  );
};

export default Quote;
