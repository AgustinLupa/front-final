import { POST, GET, DELETE } from '../Services/Httpr.js';


export const createUser = async (new_user_data) => {
    let url = 'user';
    let rsp = await POST(url, new_user_data);

    return rsp;
}

export const searchUsers = async () => {
    let url = 'user/list';
    let rsp = await GET(url);

    return rsp;
}


export const deleteUser = async  (id) =>{
    let url = 'user/' + id;
    let rsp = await DELETE(url);

    return rsp;
}