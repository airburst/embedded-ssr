import { ReactElement } from 'react';
import { Text } from '@simplybusiness/mobius-core';
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
  const { price, insurer, covers } = props;

  return (
    <div className={styles.wrapper}>
      <Text variant="h2">Insurer: {insurer}</Text>
      <Text variant="h4">Price: £ {price.amount}</Text>
      <Text variant="h4">Covers</Text>
      {covers.map(({ name, price }) => (
        <div key={name}>
          <Text>
            <strong>{name}</strong>: £ {price.amount}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default Quote;

/*
{
    "reference": "7a25a41d-2cd5-4d08-bdb9-443b8c8945c3",
    "price": { "amount": 1325.89, "currency": "GBP" },
    "insurer": "Ageas",
    "covers": [
      {
        "name": "Public liability",
        "price": { "amount": 502.16, "currency": "GBP" }
      },
      {
        "name": "Employers liability",
        "price": { "amount": 823.73, "currency": "GBP" }
      },
    ]
  }
*/
