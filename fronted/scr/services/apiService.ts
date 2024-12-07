import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/cad';

export const fetchCalls = () => axios.get(`${API_BASE_URL}/calls`);
export const createCall = (data: any) => axios.post(`${API_BASE_URL}/calls`, data);
export const updateCallStatus = (id: number, status: string) =>
    axios.put(`${API_BASE_URL}/calls/${id}`, { status });
