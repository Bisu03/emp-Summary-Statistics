import express from "express";
import { addEmployee, deleteEmployee, employeeSalary, fetchAllEmployee } from "../controllers/employee.controllers.js";

const router = express.Router();
router.post("/addemployee",  addEmployee)
router.get("/",  fetchAllEmployee)
router.delete("/deleteemployee/:id",  deleteEmployee)
router.get("/employeesalary",  employeeSalary)

export default router;