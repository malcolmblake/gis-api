import { generateRandomCoordinatePair } from "../utilities/gis-helpers.js";

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
