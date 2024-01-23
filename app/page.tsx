// pages/index.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TableComponent from '@/components/TableComponent';
import { Table } from '@/customModules/types';


const Home = () => {
  const [tables, setTables] = useState<Table[]>([]);
  const [newTableName, setNewTableName] = useState<string>('');
  const [newTableDescription, setNewTableDescription] = useState<string>('');

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = () => {
    axios.get<Table[]>('/api/table')
      .then(response => setTables(response.data))
      .catch(error => console.error('Error fetching tables:', error));
  };

  const addTable = () => {
    axios.post('/api/table', { name: newTableName, description: newTableDescription })
      .then(() => {
        fetchTables(); // Refresh the list of tables
        setNewTableName('');
        setNewTableDescription('');
      })
      .catch(error => console.error('Error adding table:', error));
  };

  const handleTableUpdate = (updatedTable: Table) => {
    setTables(tables.map(table => table.id === updatedTable.id ? updatedTable : table));
  };

  const handleTableDelete = (tableId: string) => {
    setTables(tables.filter(table => table.id !== tableId));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-100">
      <h1 className="text-4xl font-bold underline mb-8">Notion Clone</h1>
      <input type="text" className='text-black bg-white rounded-md border border-gray-300 p-2 mb-2 w-96' value={newTableName} onChange={e => setNewTableName(e.target.value)} />
      <textarea className='text-black bg-white rounded-md border border-gray-300 p-2 mb-2 w-96' value={newTableDescription} onChange={e => setNewTableDescription(e.target.value)} />
      <button className="w-96 px-6 py-2 text-lg text-white transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700" onClick={addTable}>Add Table</button>

      {tables.map(table => (
        <TableComponent key={table.id} table={table} onUpdate={handleTableUpdate} onDelete={handleTableDelete} />
      ))}
    </div>
  );
};

export default Home;
