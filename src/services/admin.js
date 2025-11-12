import { request } from '../utils/api';
import { getToken } from './auth';

export async function listUsers(){
  const token = getToken();
  return request('/admin/users', { token });
}

export async function suspendUser(id){
  const token = getToken();
  return request(`/admin/users/${id}/suspend`, { method:'PATCH', token });
}

export async function unsuspendUser(id){
  const token = getToken();
  return request(`/admin/users/${id}/unsuspend`, { method:'PATCH', token });
}

export async function deleteUser(id){
  const token = getToken();
  return request(`/admin/users/${id}`, { method:'DELETE', token });
}

