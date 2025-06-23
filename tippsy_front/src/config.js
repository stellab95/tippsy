// export const BACKEND_URL = 'https://tippsy-backend.onrender.com';

const isLocalhost = window.location.hostname === 'localhost';

export const BACKEND_URL = isLocalhost
  ? 'http://localhost:3000'
  : 'https://tippsy-backend.onrender.com';
