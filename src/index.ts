import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Erik Mejia';
  greetUser(name);
  document.body.style.backgroundColor = 'red';
});
