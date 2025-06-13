import {BACKEND_BASE_URL} from '@env';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_CONFIG = {
  BASE_URL: BACKEND_BASE_URL
};

export async function get<T>(url: string): Promise<T> {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_CONFIG.BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });

  if(!response.ok){
    const error = await response.json();
    throw new Error(error.message || 'Unable to fetch information.');
  };

  const data = await response.json();
  return data;
};

export async function post<T>(url: string, body: any) : Promise<T> {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_CONFIG.BASE_URL}/${url}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json', 
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  if(!response.ok){
    const error = await response.json();
    throw new Error(error.message || 'Server responded with an error.');
  }

  const data = await response.json();
  return data;
}