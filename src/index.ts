import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Erik Mejia!';
  var test = '';
  greetUser(name);
  document.body.style.backgroundColor = 'red';
});
