# Ici

Ici is an underway study project that aims to provide a platform for local producers and citizen in order to ease exchanges between each others.

The project is orchestrated via `docker-compose` which powers several services:

* An app for the clients and another one for the producers based on `react-redux`
* A GraphQL API served with `express` that allows the app to comunicate with a `postgresql` database,
* More to come

To build the images and run the asociated containers, cd into project and run:
> `make up`

To apply migrations and run fixtures for demonstration purpose, run:

> `make migrations fixtures`
