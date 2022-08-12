import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Joe Krug';
  greetUser(name);
  document.body.style.backgroundColor = 'red';
});
