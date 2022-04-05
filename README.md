
# Calometer
An application to track your daily calory consumption.

## Requirements
```Node Js```
```MongoDB atlas```
```npm```

## Installation

Clone the repository and open with code editor (MS Visual Studio)
Install the dependencies by running npm install in terminal

```npm
  npm install 
```

### MongoDB connection string
#### Go to MongoDB Atlas on web, and login.

>- Create a new cluster 
>- click connect
>- Connect to your app
>- Copy the connection string

Replace  CONNECTION_STRING in environment variable this copied connection string.
Also replace the DB_NAME in environment variable with your mongoDB atlas database name on which your cluster is running.

#### Starting up the backend server
For running the server , use the following command , by default it will run on port 3000

```npm
npm start
```

#### Unit test
For running unit test, use the following command.
```npm
npm test
```


    
## API Reference

### Meals

#### Get all meals

```http
  GET /api/v1/meals/${userEmail}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userEmail` | `string` | userEmail for which meal are to be retreived       |

#### Get meal by id

```http
  GET /api/v1/meals/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | Meal's id|

#### Add a new meal
```http
  POST /api/v1/meals/
```

| Parameter | Body Arguement     | Type     |  Description                |
| :-------- | :------- | :---------------| :----------------- |
|           |   `name`      | `string` |  `name of the meal`|
|           |   `Calories`  | `number` |  `Caloriy count of the meal`|
|           |   `email`      | `string` |  `user having the meal`
|           |   `created_at`   | `Date` | `creation time  of the meal`

#### Delete meal by id

```http
  DELETE /api/v1/meals/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | `Meal's uuid`|


#### Editing an existing meal
```http
  PUT /api/v1/meals/${id}
```

| Parameter | Body Arguement     | Type     |  Description                |
| :-------- | :---------- | :---------------| :----------------- |
|           |   `name`      | `string` |  `name of the meal`|
|           |   `Calories`  | `number` |  `Caloriy count of the meal`|
|           |   `email`      | `string` |  `user having the meal` |
|           |   `created_at` | `Date` | `creation time  of the meal` |
|     `id`   |              | `string` | `UUID of meal`   |



### Users 

#### Get all users list

```http
  GET /api/v1/users/
``` 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|           |           |                            |

#### Get a user by id

```http
  GET /api/v1/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | User's uuid|

#### Add a new user
```http
  POST /api/v1/users/
```

| Parameter | Body Arguement     | Type     |  Description                |
| :-------- | :------- | :---------------| :----------------- |
|           |   `name`      | `string` |  `name of the user`|
|           |   `password`  | `string` |  ` password of user`|
|           |   `email`      | `string` |  `user's email`
|           |   `isAdmin`      | `boolean` | `is user admin or not`

#### Delete user by id

```http
  DELETE /api/v1/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | `users's uuid`                     |


#### Updating an existing meal
```http
  PUT /api/v1/login/${id}
```

| Parameter | Body Arguement     | Type     |  Description    |
| :-------- | :------- | :---------------| :----------------- |
|           |   `name`      | `string` |  `name of the user`|
|           |   `password`  | `string` |  `password of user`|
|           |   `email`      | `string` |  `user 's email ` |
|           |   `isAdmin`    | `boolean` | `is user admin or not`|
|     `id`  |                | `string` | `UUID of user`   |


#### Logging in to application
```http
  POST /api/v1/user/login
```

| Parameter | Body Arguement     | Type     |  Description    |
| :-------- | :------- | :---------------| :----------------- |
|           |   `password`  | `string` |  `password of user` |
|           |   `email`      | `string` |  `user 's email `  |


#### Signing up for the  application
```http
  POST /api/v1/user/signUp
```
| Parameter | Body Arguement     | Type     |  Description    |
| :-------- | :------- | :---------------| :----------------- |
|           |   `name`      | `string` |  `name of the user`|
|           |   `password`  | `string` |  `password of user`|
|           |   `email`      | `string` |  `user 's email `  |
|           |   `isAdmin`      | `boolean` | `is user admin or not` |





## Folder Structure

1. **helpers** : folder contains helpers like errorhandlers and jwt auth handler
    - *jwt.js*
2. **models**  : folder contains scheme for mongoDB 
    - *model.js*
    - *model2.js*
3. **routers** : folder contains files with HTTP REST APIs
    - *controller1.js*
    - *controller2.js*
    
4. **tests** : folder contains files containing test cases
    - *test.js*
5. *app.js* : entry point to nodeJs app
6. *.env*  : contains environment variables for configuration
8. *package.json* : contains dependencies and versions for our app.
9. *Readme.md* : Readme File

#### Reasons for going with this folder sub-structure
1. It is modular and less clustered around app.js.
2. It is easier to maintain.

#### Front-end
The front end for this application can be found [Link text Here]( https://github.com/sahil-repos/cal-frontEnd)






