import React from "react";
import './style.css';

const PageHeader: React.FC<{ title: string; subtitle?: string; className?: string; icon?: React.ReactNode }> = ({
    title,
    subtitle,
    className,
    icon
}) => {
    return (
        <div className={`page-header ${className || ''}`}>
            <h1>
                {icon && <span className="header-icon">{icon}</span>}
                {title}
            </h1>
            {subtitle && <p>{subtitle}</p>}
        </div>
    );
}

export default PageHeader;