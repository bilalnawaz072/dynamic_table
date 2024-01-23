// components/TableComponent.tsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { Table, TableComponentProps, Task } from '../customModules/types';
import TableRowComponent from './TableRowComponent';



const TableComponent: React.FC<TableComponentProps> = ({ table ,onUpdate,onDelete })  => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(table.name);
  const [description, setDescription] = useState(table.description);



  const updateTable = () => {
    axios.put<Table>(`/api/table/${table.id}`, { name, description })
      .then(response => {
        setEditMode(false);
        onUpdate(response.data);
      })
      .catch(error => console.error('Error updating table:', error));
  };
  const deleteTable = () => {
    axios.delete(`/api/table/${table.id}`)
      .then(() => {
        onDelete(table.id); // Handle UI removal for table
      })
      .catch(error => console.error('Error deleting table:', error));
  };

  return (
    <div>
      
    </div>
  );
};

export default TableComponent;
