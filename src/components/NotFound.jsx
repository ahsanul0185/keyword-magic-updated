import React from 'react';
import notFoundImage from '../assets/404.png';

const NotFound = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', color: '#fff' }}>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <img src={notFoundImage} alt="404 Not Found" style={{ width: '300px', padding: '25px', opacity: '50%'}} />
  </div>
);

export default NotFound;