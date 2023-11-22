import { POST } from './Httpr.js';

export const LogInRequest = async (user_data) => {
    let url = 'users/login';
    let rsp = await POST(url, user_data);

    return rsp;
}