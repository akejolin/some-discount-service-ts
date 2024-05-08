# some-discount-service-ts

This service will handle discount codes. It will create codes connected to users when codes are used. The App is built on a simple Koa app. 

## Getting started

```js
npm i
npm run start

// http://localhost:3000/
```

##### Other useful npm commands

```js
npm run test // unit testing
```

## Some useful endpoints

### GET /login
Login
**Parameters**

| Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `username` | yes | string  | test username is: testy |
| `password` | yes | number  | test password is: 12345

Example: [http://localhost:3000/login?username=testy&password=12345](http://localhost:3000/login?username=testy&password=12345) 


### POST /generate-codes
Generate discount codes

**Parameters**

| Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `amount` | yes | number  | Amount of how many codes to be generated

**Response**

```json
[
  {
    "id": 1,
    "code": "4b5d2f34678818fd57a377f4ed1c4bb8",
    "desc": "20% off",
    "rate": 0.2,
  },
]
```


Example: [http://localhost:3000/generate-codes?amount=2](http://localhost:3000/generate-codes?amount=2)


### PUT /get-code
Generate discount codes

**Parameters**

| Name | Required |  Type   | Description |
| -------------:|:--------:|:-------:| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id` | yes | number  | The user who should be using the code

**Response**

```json
{
  "status": "valid",
  "code": "5d7b19bf96104c5ce0cffb56877c70e8",
  "message": "You have got a code to use for a discount on a purchase."
}
```


Example: [http://localhost:3000/get-code?user_id=0](http://localhost:3000/get-code?user_id=0)
