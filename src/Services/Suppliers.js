import { GET, POST } from "./Httpr";

const base_url= 'suppliers/';

export const create =  async (newSupplier) => {
    const url= base_url + 'create';
    let response= await POST(url, newSupplier);
    return response;
}

export const list = async () => {
    const url= base_url + 'active';
    let response= await GET(url);
    return response;
}