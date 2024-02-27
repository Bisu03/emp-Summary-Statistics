
import EmployeeModel from "../models/employee.models.js";

/**
 * @function addEmployee
 * @description for add employee details into db
 * @return {message}
 */
export const addEmployee = async (req, res) => {
  try {
    const { name, salary, currency, department, on_contract, sub_department } =
      req.body;
    await EmployeeModel.create({
      name,
      salary,
      currency,
      department,
      on_contract,
      sub_department,
    });
    return res.status(201).json({ message: "Employee record added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @function fetchAllEmployee
 * @description for find all the employess from db
 * @return {object}
 */
export const fetchAllEmployee = async (req, res) => {
  try {
    const employees = await EmployeeModel.find({});
    return res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @function deleteEmployee
 * @description for delete employee details into db
 * @return {message}
 */
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(400).json({ error: "Employee not found" });
    }
    return res.status(200).json({ message: 'Employee record deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * @function employeeSalary
 * @description for  fetch summary statistics (mean, min, max) for salaries across the entire dataset
 * @return {object}
 */
export const employeeSalary = async (req, res) => {
  try {

    const aggregationPipeline = [

      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          min: { $min: '$salary' },
          max: { $max: '$salary' },
          avg: { $avg: '$salary' }
        }
      }
    ];

    if (req.query.on_contract === true) {
      aggregationPipeline.unshift({ $match: { on_contract: true } });
    }

    if (req.query.sub_department) {
      aggregationPipeline[0].$group._id = { department: '$department', sub_department: '$sub_department' };
    } else if (req.query.department) {
      aggregationPipeline[0].$group._id = '$department';
    }

    const stats = await EmployeeModel.aggregate(aggregationPipeline);

    if (stats.length === 0) {
      return res.status(204).json({ message: 'No employees found' });
    }

    const summary = stats[0];
    return res.status(200).json({
      count: summary.count,
      minSalary: summary.min,
      maxSalary: summary.max,
      averageSalary: summary.avg,
      grouping: summary._id ? summary._id : null
    });;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}