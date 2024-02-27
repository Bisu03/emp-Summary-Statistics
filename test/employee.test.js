import sinon from 'sinon'; // Importing sinon for stubbing
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai'; 
import { addEmployee } from "../src/controllers/employee.controllers.js";
import EmployeeModel from "../src/models/employee.models.js"

describe('addEmployee function', () => {
    let req, res;
  
    beforeEach(() => {
      req = { 
        body: {
          name: 'John Doe',
          salary: 80000,
          currency: 'USD',
          department: 'IT',
          on_contract: true,
          sub_department: 'Software Development'
        }
      };
      res = {
        status: sinon.stub().returnsThis(), 
        json: sinon.stub() 
      };
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should add a new employee record and return success message', async () => {
      const createStub = sinon.stub(EmployeeModel, 'create').resolves();
  
      await addEmployee(req, res);
  
      expect(createStub.calledWith({
        name: 'John Doe',
        salary: 80000,
        currency: 'USD',
        department: 'IT',
        on_contract: true,
        sub_department: 'Software Development'
      })).to.be.true;
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: "Employee record added successfully" })).to.be.true;
    });
  
    it('should return 500 Internal Server Error if an error occurs during record creation', async () => {
      const error = new Error('Database error');
      const createStub = sinon.stub(EmployeeModel, 'create').rejects(error);
  
      await addEmployee(req, res);
  
      expect(createStub.calledWith({
        name: 'John Doe',
        salary: 80000,
        currency: 'USD',
        department: 'IT',
        on_contract: true,
        sub_department: 'Software Development'
      })).to.be.true;
      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: "Internal Server Error" })).to.be.true;
    });
  });