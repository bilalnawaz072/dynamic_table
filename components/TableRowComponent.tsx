// components/TableRowComponent.tsx
"use client";
import { TableRowProps ,TableComponentProps,Task} from "@/customModules/types";

const TableRowComponent: React.FC<TableRowProps> = ({ task }) => {

   const statusClasses = {
    'Not started': 'bg-gray-400',
    'In progress': 'bg-blue-400',
    'Done': 'bg-green-400',
  };

  const priorityClasses = {
    'Low': 'bg-green-500',
    'Medium': 'bg-yellow-500',
    'High': 'bg-red-500',
  };
  
    return (
        <div className={`grid grid-cols-7 gap-4 items-center p-4 ${task.status === 'Done' ? 'opacity-50' : ''}`}>
        <div className="col-span-2">{task.name}</div>
        <div className={`px-2 py-1 rounded-full text-white ${statusClasses[task.status]}`}>{task.status}</div>
        <div>{task.assignee}</div>
        <div>{task.dueDate}</div>
        <div className={`px-2 py-1 rounded-full text-white ${priorityClasses[task.priority]}`}>{task.priority}</div>
        <div>{task.tags.join(', ')}</div>
        <div className="flex items-center">
          <span className="mr-2">{task.project}</span>
          {/* Placeholder for project icon */}
          <span className="block w-4 h-4 bg-blue-600 rounded-full"></span>
          {/* Implement your logic for handling updates and deletes */}
          <button onClick={() => onUpdate()}>Update</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default TableRowComponent;
  