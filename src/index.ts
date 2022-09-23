import {
  cloneNode,
  getCurrentBreakpoint,
  getPublishDate,
  getSiteId,
  Interaction,
  restartWebflow,
  simulateEvent,
  TabLinkElement,
  TABS_CSS_CLASSES,
} from '@finsweet/ts-utils';

window.Webflow ||= [];
window.Webflow.push(() => {
  const tabLinks = document.querySelectorAll<TabLinkElement>(`.${TABS_CSS_CLASSES.tabLink}`);

  simulateEvent(tabLinks[2], 'click');

  const interaction = new Interaction({ element: tabLinks[2], duration: 500 });

  interaction.trigger('first');

  interaction.untilFinished()?.then(() => {
    console.log('0interaction finished!');
  });

  console.log({ tabLinks });
});
