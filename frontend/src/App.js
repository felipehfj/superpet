import React from 'react';
import './App.css';
import Routes from './routes'
import { ToastProvider } from 'react-toast-notifications';

function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={6000} >
      <Routes />
    </ToastProvider>

  );
}

export default App;