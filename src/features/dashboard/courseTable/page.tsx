import React from 'react';
import Table from '../../../components/table/page';
import { EditAction, DeleteAction, ViewAction } from '../../../components/action/page';

const CourseTable: React.FC = () => {
  const courses = [
    { id: 1, name: 'BA', duration: '3 Years' },
    { id: 2, name: 'BCom', duration: '3 Years' },
    { id: 3, name: 'BSc', duration: '3 Years' },
    { id: 4, name: 'MSc', duration: '2 Years' },
    { id: 5, name: 'BCA', duration: '3 Years' }
  ];

  const columns = [
    { key: 'id', title: 'Sr. No.', width: '15%' },
    { key: 'name', title: 'Course', width: '30%' },
    { key: 'duration', title: 'Duration', width: '25%' }
  ];

  const actions = [
    {
      label: '',
      className: 'action-cell',
      icon: '',
      onClick: (row: any) => { },
      component: (row: any) => (
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'nowrap' }}>
          <ViewAction onClick={() => console.log('View:', row)} size="small" />
          <EditAction onClick={() => console.log('Edit:', row)} size="small" />
          <DeleteAction onClick={() => console.log('Delete:', row)} size="small" />
        </div>
      )
    }
  ];

  return (
    <Table
      title="Course Management"
      columns={columns}
      data={courses}
      actions={actions}
    />
  );
};

export default CourseTable;