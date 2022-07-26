import chancejs from 'chance';
const chance = chancejs.Chance();
import mapboxgl from 'mapbox-gl';
import { boundingBoxCoordinates } from '../constants/defaults.js';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

/**
 * @function
 * @param { mapboxgl.LngLatBounds | mapboxgl.LngLatBoundsLike } bb
 * @see https://chancejs.com/location/coordinates.html
 */
export function generateRandomCoordinatePair(bb) {

  const randomLong = chance.longitude({ min: bb.getWest(), max: bb.getEast() });
  const randomLat = chance.latitude({ min: bb.getSouth(), max: bb.getNorth() });

  const randomCoordinate = new mapboxgl.LngLat(randomLong, randomLat);
  return randomCoordinate;
}

/**
 * Returns the extreme coordinates in each direction in the form of a bounding box.
 * @function
 * @returns {mapboxgl.LngLatBounds} boundingBox in the `mapboxgl.LngLatBounds` format;
 */
export function getBoundingBox() {
  let longs = [];
  let lats = [];

  boundingBoxCoordinates.map((location) => {
    longs.push(location[0]);
    lats.push(location[1]);
  });


  const north = Math.max(...lats);
  const east = Math.max(...longs);
  const south = Math.min(...lats);
  const west = Math.min(...longs);

  const ne  = new mapboxgl.LngLat(east, north);
  const sw = new mapboxgl.LngLat(west, south);

  let boundingBox = new mapboxgl.LngLatBounds(sw, ne);

  return boundingBox;
}

/**
 *
 * @param { mapboxgl.LngLatBounds | mapboxgl.LngLatBoundsLike } bb
 * @returns
 */
export function generateRandomCoordinates(bb) {
  let coordinatesList = [];

  for (let i=0; i<6; i++) {
    try {
      const longLatPair = generateRandomCoordinatePair(bb);
      coordinatesList.push(longLatPair);
    }
    catch(error){
      console.log('error in generateRandomCoordinates loop', error);
    }
  }

  return coordinatesList;
}
