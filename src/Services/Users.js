import { POST, GET, DELETE, PUT } from '../Services/Httpr.js';


export const createUser = async (new_user_data) => {
    let url = 'users/create';
    let rsp = await POST(url, new_user_data);

    return rsp;
}

export const searchUsers = async () => {
    let url = 'users/active';
    let rsp = await GET(url);

    return rsp;
}

export const updateUsers = async (id, update_params) => {
    let url ='users/update/' + id;
    let rsp = await PUT(url, update_params);
    
    return rsp;
}

export const deleteUser = async  (id) =>{
    let url = 'users/delete/' + id;
    let rsp = await DELETE(url);

    return rsp;
}