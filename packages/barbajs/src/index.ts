import barba, { ITransitionData } from '@barba/core';
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
        await contactTransition(data);
      },
    },
    {
      name: 'contact',
      from: {
        namespace: ['contact'],
      },
      sync: true,

      async leave(data) {
        await contactTransition(data);
      },
    },

    {
      name: 'pricing',
      to: {
        namespace: ['pricing'],
      },
      async leave(data) {
        await pricingLeaveTransition(data);
      },

      async enter(data) {
        await pricingEnterTransition(data);
      },
    },
    {
      name: 'pricing',
      from: {
        namespace: ['pricing'],
      },
      async leave(data) {
        await pricingLeaveTransition(data);
      },

      async enter(data) {
        await pricingEnterTransition(data);
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

const contactTransition = async (data: ITransitionData) => {
  console.log('contact: enter');

  data.next.container.classList.add('is-transitioning');

  const currentH1 = data.current.container.querySelector('h1') as HTMLHeadingElement;
  const nextH1 = data.next.container.querySelector('h1') as HTMLHeadingElement;

  const currentLogo = data.current.container.querySelector('[data-element="logo"]') as HTMLElement;
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
};

const pricingLeaveTransition = async (data: ITransitionData) => {
  data.next.container.classList.add('is-transitioning');

  const currentCircle = data.current.container.querySelector(
    `[data-element="${data.current.namespace}-circle"]`
  ) as HTMLElement;

  currentCircle.style.display = 'block';

  await gsap.to(currentCircle, {
    width: '200vw',
    height: '200vw',
    duration: 1,
    ease: 'power4',
  });
};

const pricingEnterTransition = async (data: ITransitionData) => {
  const currentCircle = data.current.container.querySelector(
    `[data-element="${data.current.namespace}-circle"]`
  ) as HTMLElement;

  const nextCircle = data.next.container.querySelector(
    `[data-element="${data.next.namespace}-circle"]`
  ) as HTMLElement;

  nextCircle.style.width = '200vw';
  nextCircle.style.height = '200vw';

  currentCircle.style.display = 'none';
  nextCircle.style.display = 'block';

  data.current.container.style.display = 'none';

  await gsap.to(nextCircle, {
    width: '0',
    height: '0',
    duration: 1,
    ease: 'power4',
  });

  nextCircle.style.display = 'none';

  data.next.container.classList.remove('is-transitioning');
};
