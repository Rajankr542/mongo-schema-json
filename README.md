# mongo-schema-json

mongo-schema-json is a simple and efficient TypeScript utility that connects to a MongoDB database and retrieves the schema of all collections within it. The schema is returned as a JSON object, providing a clear and structured representation of your database's collections and their fields.

## Installation
Install the package using npm:

```npm install mongo-schema-json```

## Usage
Here's a basic example of how to use mongo-schema-json to retrieve and log the schema of a MongoDB database:

```
import { getDbSchema } from 'mongo-schema-json';

(async () => {
  const { schema, collections } = await getDbSchema({
    uri: 'mongodb://localhost:27017',
    dbName: 'mflix',
  });

  for (const collection of collections) {
    console.log('--------------------------------------------');
    console.log('Schema for', collection);
    console.log(schema[collection]);
    console.log('--------------------------------------------');
  }
})();
```

### Sample Output

The following is a sample output for the database mflix, showcasing the schema for various collections:

```
--------------------------------------------
Schema for theaters
{
  _id: 'string',
  theaterId: 'number',
  location: {
    address: {
      street1: 'string',
      city: 'string',
      state: 'string',
      zipcode: 'string'
    },
    geo: { type: 'string', coordinates: 'number[]' }
  }
}
--------------------------------------------
--------------------------------------------
Schema for comments
{
  _id: 'string',
  name: 'string',
  email: 'string',
  movie_id: 'string',
  text: 'string',
  date: 'Date'
}
--------------------------------------------
--------------------------------------------
Schema for movies
{
  _id: 'string',
  plot: 'string',
  genres: 'string[]',
  runtime: 'number',
  cast: 'string[]',
  num_mflix_comments: 'number',
  title: 'string',
  fullplot: 'string',
  countries: 'string[]',
  released: 'Date',
  directors: 'string[]',
  rated: 'string',
  awards: { wins: 'number', nominations: 'number', text: 'string' },
  lastupdated: 'string',
  year: 'number',
  imdb: { rating: 'number', votes: 'number', id: 'number' },
  type: 'string',
  tomatoes: {
    viewer: { rating: 'number', numReviews: 'number', meter: 'number' },
    lastUpdated: 'Date'
  }
}
--------------------------------------------
--------------------------------------------
Schema for users
{ _id: 'string', name: 'string', email: 'string', password: 'string' }
--------------------------------------------
```
## API

```getDbSchema({ uri: string, dbName: string }): Promise<{ schema: Record<string, any>, collections: string[] }>``` 
\
### Parameters
**uri:** The connection string for your MongoDB instance.
\
**dbName:** The name of the database you want to retrieve the schema from.
### Returns
**schema:** An object where the keys are collection names and the values are JSON representations of the schema for each collection.
\
**collections:** An array of collection names in the database.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss your ideas.

## License
This project is licensed under the MIT License.