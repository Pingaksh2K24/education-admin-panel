import React from 'react';
import './style.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className="spinner"></span>}
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

// Pre-defined button components
export const LoginButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props}>Login</Button>
);

export const SaveButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="success" {...props}>Save</Button>
);

export const SaveChangesButton: React.FC<Omit<ButtonProps, 'variant' | 'type'>> = (props) => (
  <Button variant="success" type="submit" {...props}>Save Changes</Button>
);

export const SubmitButton: React.FC<Omit<ButtonProps, 'variant' | 'type'>> = (props) => (
  <Button variant="primary" type="submit" {...props}>Submit</Button>
);

export const CancelButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props}>Cancel</Button>
);

export const DeleteButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props}>Delete</Button>
);

export const EditButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="info" {...props}>Edit</Button>
);

export const ViewButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="light" {...props}>View</Button>
);

export const AddButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="success" {...props}>Add</Button>
);

export const UpdateButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="warning" {...props}>Update</Button>
);

export const ResetButton: React.FC<Omit<ButtonProps, 'variant' | 'type'>> = (props) => (
  <Button variant="secondary" type="reset" {...props}>Reset</Button>
);

export const SearchButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="info" {...props}>Search</Button>
);

export const DownloadButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="dark" {...props}>Download</Button>
);

export const UploadButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props}>Upload</Button>
);

export const RefreshButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props}>Refresh</Button>
);

export const BackButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="light" {...props}>Back</Button>
);

export const NextButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="primary" {...props}>Next</Button>
);

export const PreviousButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="secondary" {...props}>Previous</Button>
);

export const CloseButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props}>Close</Button>
);

export const ApproveButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="success" {...props}>Approve</Button>
);

export const RejectButton: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="danger" {...props}>Reject</Button>
);

export const ExportPDF: React.FC<Omit<ButtonProps, 'variant'>> = (props) => (
  <Button variant="success" {...props}>Export</Button>
);
export default Button;