# GIS API

## TL;DR

Check the `.env.template` file and copy it to a `.env` file.

Install the required node packages with `npm i` then:

```sh
# From this folder
cd gis-api
npm start
# or
npm run start
```

## Overview

This API returns some basic map plotting data for the `gis-app`.

It uses `mapbox-gl` and `chancejs` to generate coordinate values within the range of a bounding box.

The reference data is static within the API but was initially generated from [geojson.io](https://geojson.io/#map=12/-16.9323/145.7062).


## Links

- [chancejs.com](https://chancejs.com/)
- [mapbox.com](https://docs.mapbox.com/)
