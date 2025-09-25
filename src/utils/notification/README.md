# Notification Utility

Common notification library using react-toastify for the entire application.

## Installation

First install react-toastify:
```bash
npm install react-toastify
```

## Setup

Add ToastContainer to your main App component:

```tsx
import { ToastContainer } from 'react-toastify';
import { toastConfig } from './utils/notification/config';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <ToastContainer {...toastConfig} />
    </div>
  );
}
```

## Usage

```tsx
import notification from '../utils/notification';

// Success notification
notification.success('User created successfully!');

// Error notification
notification.error('Failed to create user');

// Warning notification
notification.warning('Please fill all required fields');

// Info notification
notification.info('Loading user data...');

// Custom options
notification.success('Success!', {
  autoClose: 5000,
  position: 'bottom-right'
});

// Dismiss all notifications
notification.dismiss();
```

## Available Methods

- `notification.success(message, options?)`
- `notification.error(message, options?)`
- `notification.warning(message, options?)`
- `notification.info(message, options?)`
- `notification.default(message, options?)`
- `notification.dismiss()`
- `notification.dismissById(id)`