# Confirmation Component

A reusable confirmation dialog component with different types and styles.

## Features

- 5 different types: `delete`, `warning`, `success`, `error`, `info`
- Custom icons for each type
- Promise-based API
- Loading states
- Customizable text and buttons

## Usage

### Method 1: Direct Component

```tsx
import Confirmation from '../components/confirmation';

const [showConfirm, setShowConfirm] = useState(false);

<Confirmation
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={() => {
    // Handle confirmation
    setShowConfirm(false);
  }}
  title="Delete User"
  message="Are you sure you want to delete this user?"
  type="delete"
  confirmText="Delete"
  cancelText="Cancel"
/>
```

### Method 2: Hook (Recommended)

```tsx
import { useConfirmation } from '../components/confirmation/useConfirmation';

const MyComponent = () => {
  const { showConfirmation, ConfirmationComponent } = useConfirmation();

  const handleDelete = async () => {
    const confirmed = await showConfirmation({
      title: 'Delete User',
      message: 'Are you sure you want to delete this user?',
      type: 'delete',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      // Proceed with deletion
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
      <ConfirmationComponent />
    </div>
  );
};
```

## Types

- `delete` - Red theme for destructive actions
- `warning` - Orange theme for warnings
- `success` - Green theme for success confirmations
- `error` - Red theme for error confirmations
- `info` - Blue theme for informational confirmations

## Props

- `isOpen` - Controls visibility
- `onClose` - Cancel callback
- `onConfirm` - Confirm callback
- `title` - Dialog title
- `message` - Dialog message
- `type` - Confirmation type
- `confirmText` - Confirm button text
- `cancelText` - Cancel button text
- `loading` - Loading state