import './styles.css';
import React from 'react';
import ReactDOM from 'react-dom';
import ClerkProviderWithRouting from './ClerkProvider'; // Ensure this import path is correct

ReactDOM.render(
  <ClerkProviderWithRouting />,
  document.getElementById('root')
);
