import { POST, GET, DELETE, PUT } from '../Services/Httpr.js';

export const createEmployee = async (new_employee_data) => {
    let url = 'employee';
    let rsp = await POST(url, new_employee_data);

    return rsp;
}

export const searchEmployee = async () => {
    let url = 'employee/active';
    let rsp = await GET(url);

    return rsp;
}

export const updateEmployee = async (id, update_params) => {
    let url ='employee/' + id;
    let rsp = await PUT(url, update_params);
    
    return rsp;
}

export const deleteEmployee = async  (code_employee) =>{
    let url = 'employee/' + code_employee;
    let rsp = await DELETE(url);

    return rsp;
}