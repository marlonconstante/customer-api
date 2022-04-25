# Customer API

REST API for customer registration.

## Install and run application

```bash
$ docker-compose up --build
```

## Access application terminal

```bash
$ docker-compose exec api sh
```

## Test (in container)

```bash
# unit tests
~/api $ yarn test

# e2e tests
~/api $ yarn test:e2e

# test coverage
~/api $ yarn test:cov
```

## Postman collection

[api.postman_collection.json](api.postman_collection.json)

## API documentation (Swagger)

http://localhost:3000/api

## HTTP requests

### Create Customer

```http
POST http://localhost:3000/api/customers
Content-Type: application/json

{
  "name": "Marlon Constante",
  "email": "marlon.constante@gmail.com",
  "birthDate": "1986-08-18"
}
```

### Find Customers

```http
GET http://localhost:3000/api/customers?page=1&size=10&name=Constante&email=marlon.constante@gmail.com&birthDate=1986-08-18
```

### Get Customer

```http
GET http://localhost:3000/api/customers/fe8173e9-6929-4f9b-82f0-488306e5cf5c
```

### Update Customer

```http
PATCH http://localhost:3000/api/customers/fe8173e9-6929-4f9b-82f0-488306e5cf5c
Content-Type: application/json

{
  "name": "Marlon Constante"
}
```

### Remove Customer

```http
DELETE http://localhost:3000/api/customers/fe8173e9-6929-4f9b-82f0-488306e5cf5c
```
