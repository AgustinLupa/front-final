import { POST } from './Httpr.js';

export const LogInRequest = async (user) => {
    let url = 'users/login';    
    let rsp = await POST(url, user);   
    return rsp;
}