// types.ts

export interface Table {
    id: string;
    name: string;
    description: string;
  }
  
  export interface TableComponentProps {
    table: Table;
    onUpdate: (updatedTable: Table) => void;
    onDelete: (tableId: string) => void;
  }
  
  export interface Task {
    id: string;
    name: string;
    status: 'Not started' | 'In progress' | 'Done';
    assignee: string;
    due: string;
    priority: 'Low' | 'Medium' | 'High';
    tags: string[];
    project: string;
  }
  
  export interface TableRowProps {
    task: Task;
  }