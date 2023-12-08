import { POST, GET, DELETE } from '../Services/Httpr.js';

export const createEmployee = async (new_employee_data) => {
    let url = 'employee';
    let rsp = await POST(url, new_employee_data);

    return rsp;
}

export const searchEmployee = async () => {
    let url = 'employee/';
    let rsp = await GET(url);

    return rsp;
}


export const deleteEmployee = async  (id) =>{
    let url = 'employee/' + id;
    let rsp = await DELETE(url);

    return rsp;
}