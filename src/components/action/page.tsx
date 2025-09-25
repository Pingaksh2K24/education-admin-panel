import React from 'react';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  PrinterIcon,
  Cog6ToothIcon,
  HeartIcon,
  BookmarkIcon,
  StarIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import './style.css';

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  tooltip?: string;
}

const ActionButton: React.FC<ActionButtonProps & { icon: React.ReactNode; className?: string }> = ({
  icon,
  onClick,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  tooltip,
  className = ''
}) => {
  return (
    <button
      className={`action-btn action-btn-${size} action-btn-${variant} ${className} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >
      {icon}
    </button>
  );
};

// Action Button Components
export const EditAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<PencilIcon />} variant="primary" tooltip="Edit" {...props} />
);

export const DeleteAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<TrashIcon />} variant="warning" tooltip="Delete" {...props} />
);

export const ViewAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<EyeIcon />} variant="secondary" tooltip="View" {...props} />
);

export const AddAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<PlusIcon />} variant="success" tooltip="Add" {...props} />
);

export const DownloadAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<ArrowDownTrayIcon />} variant="primary" tooltip="Download" {...props} />
);

export const UploadAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<ArrowUpTrayIcon />} variant="primary" tooltip="Upload" {...props} />
);

export const RefreshAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<ArrowPathIcon />} variant="secondary" tooltip="Refresh" {...props} />
);

export const ApproveAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<CheckIcon />} variant="success" tooltip="Approve" {...props} />
);

export const RejectAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<XMarkIcon />} variant="danger" tooltip="Reject" {...props} />
);

export const CopyAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<DocumentDuplicateIcon />} variant="info" tooltip="Copy" {...props} />
);

export const ShareAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<ShareIcon />} variant="primary" tooltip="Share" {...props} />
);

export const PrintAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<PrinterIcon />} variant="secondary" tooltip="Print" {...props} />
);

export const SettingsAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<Cog6ToothIcon />} variant="warning" tooltip="Settings" {...props} />
);

export const FavoriteAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<HeartIcon />} variant="danger" tooltip="Favorite" {...props} />
);

export const BookmarkAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<BookmarkIcon />} variant="warning" tooltip="Bookmark" {...props} />
);

export const StarAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<StarIcon />} variant="warning" tooltip="Star" {...props} />
);

export const NotificationAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<BellIcon />} variant="info" tooltip="Notification" {...props} />
);

export const CommentAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<ChatBubbleLeftIcon />} variant="primary" tooltip="Comment" {...props} />
);

export const SendAction: React.FC<ActionButtonProps> = (props) => (
  <ActionButton icon={<PaperAirplaneIcon />} variant="success" tooltip="Send" {...props} />
);

export default ActionButton;