import mongoose from "mongoose"

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'etc...'],
        required: true
    },
    department: {
        type: String,
        required: true
    },
    on_contract: {
        type: Boolean,
        required: false,
        default: false
    },
    sub_department: {
        type: String
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee 