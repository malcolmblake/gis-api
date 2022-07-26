import { config } from 'dotenv';
import express from 'express';
import helmet from "helmet";
import cors from 'cors';
// Our imports
import { generateRandomCoordinates } from'./routes/coordinates.js';
import { outlineCoordinates } from './constants/cairns-geojson';
import { getBoundingBox } from './utilities/gis-helpers.js';
// Run this first after imports.
config();
// App defaults
const app = express()
const port = process.env.PORT;
// Add security
const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200
}
app.use(helmet.xssFilter());
app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  try {
    const boundingBox = getBoundingBox();
    const randomPoints = generateRandomCoordinates(boundingBox);

    const response = {
      data: {
        boundingBox: boundingBox,
        randomPoints: randomPoints,
        mapOutline: outlineCoordinates
      }
    }

    return res.json(response);
  }
  catch(error) {
    console.error(error.message);
    res.status(500);
    return res.send(error);
  }
})

// And finally; listen:
app.listen(port, () => {
  console.log(`GIS API listening on port ${port}`)
})