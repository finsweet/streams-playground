// Maps instance
// LatLng decimal degrees
const map = new window.google.maps.Map(HTMLElement, { center, zoom });

// Set map center
instance.setCenter({ lat: latitude, lng: longitude });

// Set map zoom
instance.setZoom(10);

// Marker
const marker = new window.google.maps.Marker({
  position,
  map,
  title,
});

// Add marker listener
const markerListener = marker.addListener('click', handleClick);

// Remove marker listener
markerListener.remove();

// Remove marker from map
marker.setMap(null);

// Info window
const infoWindow = new google.maps.InfoWindow({ content: createInfoWindowHTML(agency) });

// Open info window
infoWindow.open(instance, marker);

// Close info window
infoWindow.close();

// Init Autocomplete input
this.autocomplete = new window.google.maps.places.Autocomplete(this.locationInput, {
  fields: ['geometry'],
  types: ['geocode'],
});

// Get place
autocomplete.getPlace();

// Init Autocomplete service
this.autocompleteService = new window.google.maps.places.AutocompleteService();

// Get place predictions
await autocompleteService.getPlacePredictions({ input, types: ['geocode'] }, (result) => {});

// Init places service
this.placesService = new window.google.maps.places.PlacesService(this.googleMap.instance);

// Get place details
placesService.getDetails({ placeId: result[0].place_id, fields: ['geometry'] }, (result) => {});

/**
 * Returns the latitude and longitude of a Place result
 * @param placeResult
 */
export const getLocation = (
  placeResult: google.maps.places.PlaceResult | null
): {
  latitude: number | undefined,
  longitude: number | undefined,
} => {
  const location = placeResult?.geometry?.location;
  return { latitude: location?.lat(), longitude: location?.lng() };
};
