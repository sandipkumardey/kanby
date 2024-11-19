import React from 'react';
import KanbanBoard from '../components/KanbanBoard';

export default function Board() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}
