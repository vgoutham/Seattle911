# Seattle 911 Alert

This is a project to help Seattle residents and the Seattle Police Department visualize crime data in new and interesting ways.

We access the dataset of all the police responses to 911 calls in Seattle via the [Socrata Open Data API](https://dev.socrata.com/foundry/data.seattle.gov/pu5n-trf4). The dataset is updated on a 4 hr interval.

#### Installation
```
npm install
npm run config-db
npm start
```

*Note:* You will need to add a [Mapbox](https://www.mapbox.com/mapbox-studio/) access token and style URL to the `config.js` file.
