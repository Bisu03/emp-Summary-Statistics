
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
    console.log(req.body);
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
    
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @function fetchAllEmployee
 * @description for find all the employess from db
 * @return {object}
 */
export const fetchAllEmployee = async (req, res) => {
  try {
    console.log(req.userId);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalData = await EmployeeModel.countDocuments();
    const employees = await EmployeeModel.find({}).sort("-createdAt").skip(skip).limit(limit)
    console.log(totalData);
    const totalPages = Math.ceil(totalData / limit);
    return res.status(200).json(
      {
        list: employees,
        currentPage: page,
        totalPages,
      }
    );

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
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
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * @function employeeSalary
 * @description for  fetch summary statistics (mean, min, max) for salaries across the entire dataset
 * @return {object}
 */
export const employeeSalary = async (req, res) => {
  try {
    const aggregationPipeline = [];

    if (req.query.on_contract == "true") {
      aggregationPipeline.push({ $match: { on_contract: true } });
    }

    if (req.query.department) {
      aggregationPipeline.push({ $match: { department: req.query.department } });
    }

    if (req.query.sub_department) {
      aggregationPipeline.push({ $match: { sub_department: req.query.sub_department } });
    }

    aggregationPipeline.push({
      $group: {
        _id: null,
        count: { $sum: 1 },
        minSalary: { $min: '$salary' },
        maxSalary: { $max: '$salary' },
        averageSalary: { $avg: '$salary' }
      }
    });

    const stats = await EmployeeModel.aggregate(aggregationPipeline);

    if (stats.length === 0) {
      return res.status(404).json({ message: 'No employees found' });
    }

    const summary = stats[0];

    res.status(200).json({
      count: summary.count,
      minSalary: summary.minSalary,
      maxSalary: summary.maxSalary,
      averageSalary: summary.averageSalary
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}