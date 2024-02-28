import express from "express";
import { addEmployee, deleteEmployee, employeeSalary, fetchAllEmployee } from "../controllers/employee.controllers.js";
import { userMiddleware } from "../middleware/verify.js";

const router = express.Router();
router.post("/addemployee", userMiddleware, addEmployee)
router.get("/", userMiddleware, fetchAllEmployee)
router.delete("/deleteemployee/:id", userMiddleware, deleteEmployee)
router.get("/employeesalary", userMiddleware, employeeSalary)

export default router;