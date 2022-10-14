window.Webflow ||= [];
window.Webflow.push(() => {
  const mapElement = document.querySelector<HTMLElement>('[fs-element="map-target"]');

  if (!mapElement) {
    return;
  }

  const map = new window.google.maps.Map(mapElement, {
    zoom: 12,
    center: { lat: 21.1213393, lng: -86.8842527 },
  });

  const nyButton = document.querySelector<HTMLAnchorElement>('[fs-element="button-ny"]');

  if (!nyButton) {
    return;
  }

  nyButton.addEventListener('click', (e) => {
    e.preventDefault();

    map.setCenter({
      lat: 40.6974034,
      lng: -74.1197616,
    });
  });

  const form = document.querySelector<HTMLFormElement>('[fs-element="search-form"]');
  const input = document.querySelector<HTMLInputElement>('[fs-element="search-input"]');
  if (!form || !input) {
    return;
  }

  // Add autocompletion to the input
  const autocomplete = new window.google.maps.places.Autocomplete(input, {
    fields: ['geometry'],
    types: ['geocode'],
  });

  // Check when the user submits the form
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = autocomplete.getPlace();

    map.setCenter(value.geometry?.location);
    console.log(value);
  });

  // Get the input value+

  // Center the map to the user's requested place
});
