// import sinon from 'sinon'; // Importing sinon for stubbing
import { describe, it, beforeEach, afterEach } from 'mocha';
import { assert } from 'chai';
import { addEmployee } from "../src/controllers/employee.controllers.js";
// import EmployeeModel from "../src/models/employee.models.js"


describe('---add employee function---', () => {
    let employeeData = {
        name: 'John Doe',
        salary: 80000,
        currency: 'USD',
        department: 'IT',
        on_contract: true,
        sub_department: 'Software Development'
    }
    it("check types", () => {
        assert.typeOf(employeeData.name, "string")
        assert.typeOf(employeeData.salary, "number")
        assert.typeOf(employeeData.currency, "string")
        assert.typeOf(employeeData.department, "string")
        assert.typeOf(employeeData.on_contract, "boolean")
        assert.typeOf(employeeData.sub_department, "string")
    })
})
