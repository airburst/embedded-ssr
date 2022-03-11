import React from 'react';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { type QuoteFormData } from '../types';
import Head from 'next/head';
import { Text, TextField, Button } from '@simplybusiness/mobius-core';
import '@simplybusiness/mobius-theme-simplybusiness';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: QuoteFormData) => {
    if (Object.keys(errors).length === 0) {
      // Redirect to quotes page to run query
      router.push({ pathname: 'quotes', query: data });
    }
  };

  const dummy = () => {};

  return (
    <div className={styles.container}>
      <Head>
        <title>Find quotes</title>
        <meta name="description" content="Create an RFQ" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text variant="h1">What are you looking for?</Text>

      <form className={styles.quoteForm} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="firstName"
          label="First name"
          {...register('firstName', {
            required: 'Please enter your first name',
            minLength: {
              value: 3,
              message: 'Please enter at least 3 characters',
            },
          })}
          onChange={dummy}
          errorMessage={errors.firstName?.message}
        />

        <TextField
          id="lastName"
          label="Last name"
          {...register('lastName', {
            required: 'Please enter your last name',
            minLength: {
              value: 3,
              message: 'Please enter at least 3 characters',
            },
          })}
          onChange={dummy}
          errorMessage={errors.lastName?.message}
        />

        <TextField
          id="email"
          label="Email"
          {...register('email', {
            required: 'Please enter a valid email address',
            pattern: /^\S+@\S+$/i,
          })}
          onChange={dummy}
          errorMessage={errors.email?.message}
        />

        <TextField
          id="postcode"
          label="Postcode"
          {...register('postcode', {
            required: 'Please enter a valid postcode',
            maxLength: { value: 9, message: 'Postcode is too long' },
          })}
          onChange={dummy}
          errorMessage={errors.postcode?.message}
        />

        <Button type="submit">Find Quotes</Button>
      </form>
    </div>
  );
};

export default Home;
