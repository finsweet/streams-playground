import barba from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

// barba.init();

barba.init({
  debug: true,
  transitions: [
    // Default
    {
      name: 'default-transition',
      async leave(data) {
        console.log(`leaving ${data.current.namespace}`);
        console.log(data);

        await gsap.to(data.current.container, {
          opacity: 0,
          duration: 0.25,
        });
      },
      async enter(data) {
        console.log(`entering ${data.next.namespace}`);
        console.log(data);

        await gsap.from(data.current.container, {
          opacity: 0,
          duration: 0.25,
        });
      },
    },

    // Rules
    {
      name: 'contact',
      to: {
        namespace: ['contact'],
      },
      sync: true,
      async enter(data) {
        console.log('contact: enter');

        data.next.container.classList.add('is-transitioning');

        const currentH1 = data.current.container.querySelector('h1') as HTMLHeadingElement;
        const nextH1 = data.next.container.querySelector('h1') as HTMLHeadingElement;

        const currentLogo = data.current.container.querySelector(
          '[data-element="logo"]'
        ) as HTMLElement;
        const nextLogo = data.next.container.querySelector('[data-element="logo"]') as HTMLElement;

        const currentLogoParent = currentLogo.parentNode as HTMLElement;
        const nextLogoParent = nextLogo.parentNode as HTMLElement;

        const state = Flip.getState(currentLogo);

        currentLogoParent.style.height = `${currentLogo.offsetHeight}px`;
        nextLogo.remove();
        nextLogoParent.appendChild(currentLogo);

        await Promise.all([
          Flip.from(state, { duration: 0.5 }),
          gsap.to(currentH1, { opacity: 0, duration: 0.5 }),
          gsap.from(nextH1, { opacity: 1, duration: 0.5 }),
        ]);

        data.next.container.classList.remove('is-transitioning');
      },
    },
    {
      name: 'contact',
      from: {
        namespace: ['contact'],
      },
      sync: true,
      async leave(data) {
        console.log('contact: leave');

        data.next.container.classList.add('is-transitioning');

        const currentH1 = data.current.container.querySelector('h1') as HTMLHeadingElement;
        const nextH1 = data.next.container.querySelector('h1') as HTMLHeadingElement;

        const currentLogo = data.current.container.querySelector(
          '[data-element="logo"]'
        ) as HTMLElement;
        const nextLogo = data.next.container.querySelector('[data-element="logo"]') as HTMLElement;
        const currentLogoParent = currentLogo.parentNode as HTMLElement;
        const nextLogoParent = nextLogo.parentNode as HTMLElement;

        const state = Flip.getState(currentLogo);

        currentLogoParent.style.height = `${currentLogo.offsetHeight}px`;
        nextLogo.remove();
        nextLogoParent.appendChild(currentLogo);

        await Promise.all([
          Flip.from(state, { duration: 0.5 }),
          gsap.to(currentH1, { opacity: 0, duration: 0.5 }),
          gsap.from(nextH1, { opacity: 1, duration: 0.5 }),
        ]);

        data.next.container.classList.remove('is-transitioning');
      },
    },
  ],

  // Views
  views: [
    {
      namespace: 'home',
      beforeEnter() {
        console.log('home beforeEnter');
      },
    },
  ],
});

// Restart Webflow
barba.hooks.after(async (data) => {
  if (data?.next.html) {
    const nextPage = new DOMParser().parseFromString(data.next.html, 'text/html');
    const pageId = nextPage.documentElement.getAttribute('data-wf-page');

    if (pageId) {
      document.documentElement.setAttribute('data-wf-page', pageId);
    }
  }

  await restartWebflow();
});

function swap(a: HTMLElement, b: HTMLElement) {
  a.parentNode?.children[0] === a ? a.parentNode.appendChild(a) : a.parentNode?.appendChild(b);
}
