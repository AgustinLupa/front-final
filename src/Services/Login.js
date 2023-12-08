import { POST } from './Httpr.js';

export const LogInRequest = async (user) => {
    let url = 'user/login';    
    let rsp = await POST(url, user);   
    return rsp;
}