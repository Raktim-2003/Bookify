import { State, City } from "country-state-city";

export function createLocationSlug(city, state) {
  if (!city || !state) return "";

  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  const stateSlug = state.toLowerCase().replace(/\s+/g, "-");

  return `${citySlug}-${stateSlug}`;
}

export function parseLocationSlug(slug) {
  if (!slug || typeof slug !== "string") {
    return {
      city: null,
      state: null,
      isValid: false,
    };
  }

  const parts = slug.split("-");

  // Must contain at least city + state
  if (parts.length < 2) {
    return {
      city: null,
      state: null,
      isValid: false,
    };
  }

  // Parse city name
  const cityName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);

  // Parse state name
  const stateName = parts
    .slice(1)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  // Get all Indian states
  const indianStates = State.getStatesOfCountry("IN");

  // Find matching state
  const stateObj = indianStates.find(
    (state) => state.name.toLowerCase() === stateName.toLowerCase(),
  );

  if (!stateObj) {
    return {
      city: null,
      state: null,
      isValid: false,
    };
  }

  // Get cities of the state
  const cities = City.getCitiesOfState("IN", stateObj.isoCode);

  // Check if city exists
  const cityExists = cities.some(
    (city) => city.name.toLowerCase() === cityName.toLowerCase(),
  );

  if (!cityExists) {
    return {
      city: null,
      state: null,
      isValid: false,
    };
  }

  return {
    city: cityName,
    state: stateName,
    isValid: true,
  };
}
