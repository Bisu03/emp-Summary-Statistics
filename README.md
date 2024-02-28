# Project Title

Micro-Service for Summary Statistics

## Acknowledgements

- [nodejs must be installed in your pc]()
- [download or clone the app]()
- [Go into the root directory]()
- [open it in your code editor]()
- [do `npm install` in the terminal and let the all packages installed]()
- [create `.env` in the root directory using sample file]()
- [`npm start` on the terminal to start the server]()

## API methods and endpoints

### Register User API

```
  POST http://localhost:8000/api/auth/register
```

This endpoint is used to register a new user.

#### Request Body

- `username` (string, required): The name of the user.
- `email` (number, required): The user email.
- `password` (string, required): The user password.

#### input sample

##### raw (json)

```

 {
    "username":"testuser",
    "email":"testuser@gmail.com",
    "password":"1234"
}

```

#### Response

- Status: 201
- Content-Type: application/json
- `message` (string): A message confirming the success of the operation.


### Login User API

```
  POST http://localhost:8000/api/auth/login
```

This endpoint is used to login a user after register.

#### Request Body

- `username` (string, required): The name of the user.
- `password` (string, required): The user password.

#### input sample

##### raw (json)

```

 {
    "username":"testuser",
    "password":"1234"
}

```

#### Response

- Status: 201
- Content-Type: application/json
- `object` (object): it will reture a user info and token .
### Add Header

- [ setup the authorization header otherwise it will not work  ]()
- [ copy the the token ]()
- [ then add to the Authorization : "Bearer " + {token}]()

### Add Employee API

```
  POST http://localhost:8000/api/employee/addemployee
```

This endpoint is used to add a new employee.

#### Request Body

- `name` (string, required): The name of the employee.
- `salary` (number, required): The salary of the employee.
- `currency` (string, required): The currency in which the salary is paid.
- `department` (string, required): The department to which the employee belongs.
- `on_contract` (boolean, required): Indicates whether the employee is on contract or not.
- `sub_department` (string, required): The sub-department to which the employee belongs.

#### input sample

##### raw (json)

```
{
    "name": "Nikhil",
    "salary": "110000",
    "currency": "USD",
    "on_contract": "true",
    "department": "Engineering",
    "sub_department": "Platform"
}
```

#### Response

- Status: 201
- Content-Type: application/json
- `message` (string): A message confirming the success of the operation.

### Fetch Employee API

```
  GET http://localhost:8000/api/employee
```

This endpoint is used to fetch all employee.

#### Response

- Status: 201
- Content-Type: application/json
- `object`: sample data .

```
[
     {
        "_id": "65ddb4d6cc18ba5fc0a33dcc",
        "name": "Nikhil",
        "salary": 110000,
        "currency": "USD",
        "department": "Engineering",
        "on_contract": true,
        "sub_department": "Platform",
        "__v": 0
    },
    {
        "on_contract": false,
        "_id": "65ddb4e689daab01afdc0ea9",
        "name": "Abhishek",
        "salary": 145000,
        "currency": "USD",
        "department": "Engineering",
        "sub_department": "Platform"
    },
]
```

### Delete Employee API

```
  DELETE http://localhost:8000/api/employee/deleteemployee/:employee_object_id
```

This endpoint is used to delete employee.

#### Response

- Status: 201
- Content-Type: application/json
- `message` (string): A message confirming the success of the operation.

### Summary Statistics Employee API

```
  GET http://localhost:8000/api/employee/employeesalary
```

it will take query params

```
    Query Param - (single or all)
    sub_department=true,
    department=true,
    on_contract=truek
```

#### url sample

```
  GET http://localhost:8000/api/employee/employeesalary?sub_department=true
```

This endpoint is used to get fetch summary statistics
(avg, min, max, count) for salaries across the entire dataset.

#### Response

- Status: 201
- Content-Type: application/json
- `object`: sample data .

```
{
    "count": 5,
    "minSalary": 110000,
    "maxSalary": "30",
    "averageSalary": 110000,
    "grouping": {
        "department": "Engineering",
        "sub_department": "Platform"
    }
}
```

## To test

- [go to test dir `cd test`](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [run `npx mocha employee.test.js` ](https://github.com/matiassingers/awesome-readme)


## 🔗 Then Setup The Frontend
https://github.com/Bisu03/emp-Summary-Statistics-frontend

