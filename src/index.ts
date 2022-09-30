window.Webflow ||= [];
window.Webflow.push(() => {
  const listElement = document.querySelector('[fs-element="cool-names-list"');
  const itemTemplate = listElement?.querySelector('[fs-element="cool-list-item"]');
  if (!listElement || !itemTemplate) {
    alert('Missing list!');
    return;
  }

  const names = ['Micah', 'Joel', 'Josh', 'Simone'];

  for (const name of names) {
    const newItem = itemTemplate.cloneNode(true);
    newItem.textContent = name;

    listElement.append(newItem);
  }
});
