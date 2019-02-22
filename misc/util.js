import axios from 'axios';

export const authenticate = async (email, password) => {
  const { data } = await axios.post('/api/login', { email, password });
  console.log(data);
  if (data) return data;
};
