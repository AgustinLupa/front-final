import { DELETE, GET, POST, PUT } from "./Httpr";

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

export const edit = async (supplier) => {
    const url= base_url + supplier.id;
    let response= await PUT(url, supplier);
    return response;
}

export const hide = async (supplierId) => {
    const url= base_url + supplierId;
    let response= await DELETE(url);
    return response;
}