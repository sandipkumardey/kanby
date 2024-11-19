import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog'
import { Button } from './ui/Button'
import TicketForm from './TicketForm'
import Comments from './Comments'

const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    taskIds: ['task-1', 'task-2', 'task-3'],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    taskIds: ['task-4', 'task-5'],
  },
  done: {
    id: 'done',
    title: 'Done',
    taskIds: ['task-6'],
  },
}

const initialTasks = {
  'task-1': { id: 'task-1', content: 'Create login page', priority: 'high', status: 'todo', assignedTo: 'user1', comments: [] },
  'task-2': { id: 'task-2', content: 'Design database schema', priority: 'medium', status: 'todo', assignedTo: 'user2', comments: [] },
  'task-3': { id: 'task-3', content: 'Implement user authentication', priority: 'high', status: 'todo', assignedTo: 'user3', comments: [] },
  'task-4': { id: 'task-4', content: 'Develop API endpoints', priority: 'medium', status: 'inProgress', assignedTo: 'user1', comments: [] },
  'task-5': { id: 'task-5', content: 'Write unit tests', priority: 'low', status: 'inProgress', assignedTo: 'user2', comments: [] },
  'task-6': { id: 'task-6', content: 'Set up CI/CD pipeline', priority: 'medium', status: 'done', assignedTo: 'user3', comments: [] },
}

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialColumns)
  const [tasks, setTasks] = useState(initialTasks)
  const [editingTask, setEditingTask] = useState(null)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = columns[source.droppableId]
    const finish = columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      })
    } else {
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      })

      setTasks({
        ...tasks,
        [draggableId]: {
          ...tasks[draggableId],
          status: finish.id,
        },
      })
    }
  }

  const handleCreateTicket = (newTicket) => {
    const taskId = `task-${Date.now()}`
    const updatedTasks = {
      ...tasks,
      [taskId]: { id: taskId, content: newTicket.title, ...newTicket, comments: [] },
    }
    setTasks(updatedTasks)

    const updatedColumns = {
      ...columns,
      [newTicket.status]: {
        ...columns[newTicket.status],
        taskIds: [...columns[newTicket.status].taskIds, taskId],
      },
    }
    setColumns(updatedColumns)
  }

  const handleUpdateTicket = (updatedTicket) => {
    const updatedTasks = {
      ...tasks,
      [updatedTicket.id]: { ...tasks[updatedTicket.id], ...updatedTicket },
    }
    setTasks(updatedTasks)

    if (updatedTicket.status !== tasks[updatedTicket.id].status) {
      const oldStatus = tasks[updatedTicket.id].status
      const newStatus = updatedTicket.status

      const updatedColumns = {
        ...columns,
        [oldStatus]: {
          ...columns[oldStatus],
          taskIds: columns[oldStatus].taskIds.filter(id => id !== updatedTicket.id),
        },
        [newStatus]: {
          ...columns[newStatus],
          taskIds: [...columns[newStatus].taskIds, updatedTicket.id],
        },
      }
      setColumns(updatedColumns)
    }

    setEditingTask(null)
  }

  const handleAddComment = (taskId, comment) => {
    const updatedTasks = {
      ...tasks,
      [taskId]: {
        ...tasks[taskId],
        comments: [
          ...tasks[taskId].comments,
          { text: comment, user: 'Current User', timestamp: new Date().toISOString() }
        ],
      },
    }
    setTasks(updatedTasks)
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">Create New Ticket</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
          </DialogHeader>
          <TicketForm onSubmit={handleCreateTicket} />
        </DialogContent>
      </Dialog>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-4">
          {Object.values(columns).map((column) => (
            <div key={column.id} className="w-64">
              <h2 className="font-bold mb-4">{column.title}</h2>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-100 p-4 rounded-md min-h-[500px]"
                  >
                    {column.taskIds.map((taskId, index) => (
                      <Draggable key={taskId} draggableId={taskId} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-2 rounded shadow"
                          >
                            <div>{tasks[taskId].content}</div>
                            <div className="mt-2 text-sm text-gray-500">
                              Priority: {tasks[taskId].priority}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                              Assigned to: {tasks[taskId].assignedTo}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setEditingTask(tasks[taskId])}
                            >
                              Edit
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <>
              <TicketForm
                initialData={editingTask}
                onSubmit={handleUpdateTicket}
              />
              <Comments
                comments={editingTask.comments}
                onAddComment={(comment) => handleAddComment(editingTask.id, comment)}
              />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}