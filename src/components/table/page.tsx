import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import './style.css';

interface Column {
  key: string;
  title: string;
  width?: string;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
  className?: string;
  icon?: string;
  component?: (row: any) => React.ReactNode;
}

interface TableProps {
  title: string;
  columns: Column[];
  data: any[];
  actions?: Action[];
}

const Table: React.FC<TableProps> = ({ title, columns, data, actions }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">
        <ChartBarIcon className="table-title-icon" />
        {title}
      </h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} style={{ width: column.width }}>
                  {column.title}
                </th>
              ))}
              {actions && actions.length > 0 && <th style={{ width: '30%' }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key}>{row[column.key]}</td>
                ))}
                {actions && actions.length > 0 && (
                  <td>
                    {actions.map((action, actionIndex) => (
                      action.component ? (
                        <div key={actionIndex}>{action.component(row)}</div>
                      ) : (
                        <button
                          key={actionIndex}
                          className={`table-action-btn ${action.className || ''}`}
                          onClick={() => action.onClick(row)}
                        >
                          {action.icon && <span className="action-icon">{action.icon}</span>}
                          {action.label}
                        </button>
                      )
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;