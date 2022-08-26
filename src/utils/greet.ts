/* eslint-disable no-console */
import { getPublishDate } from '@finsweet/ts-utils';

import { sayHello } from './say-hello';

/**
 * Greets the user by printing a message in the console.
 * @param name The user's name.
 */
export const greetUser = (name: string) => {
  const publishDate = getPublishDate();

  console.log(`${sayHello()} ${name}!`);
  console.log(
    `This site was last published on ${publishDate?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    })}.`
  );
};
