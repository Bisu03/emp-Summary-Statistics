
# Project Title

Micro-Service for Summary Statistics


## Acknowledgements

 - [nodejs must be installed in your pc](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
 - [download or clone the app](https://github.com/matiassingers/awesome-readme)
 - [Go into the root directory](https://github.com/matiassingers/awesome-readme)
 - [open it in your code editor](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [do `npm install` in the terminal and let the all packages installed](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [create `.env` in the root directory using sample file](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
 - [`npm start` on the terminal to start the server](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)


## API methods and endpoints

### Add Employee API

```
  POST http://localhost:8000/api/addemployee
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
  GET http://localhost:8000/api
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
  DELETE http://localhost:8000/api/deleteemployee/:employee_object_id
```
This endpoint is used to delete employee.

#### Response

- Status: 201
- Content-Type: application/json
- `message` (string): A message confirming the success of the operation.

### Summary Statistics Employee API

```
  GET http://localhost:8000/api/employeeSalary
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
  GET http://localhost:8000/api/employeeSalary?sub_department=true
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
