import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select'

const users = [
  { id: 'user1', name: 'John Doe' },
  { id: 'user2', name: 'Jane Smith' },
  { id: 'user3', name: 'Bob Johnson' },
]

export default function TicketForm({ onSubmit, initialData = {} }) {
  const [ticket, setTicket] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    priority: initialData.priority || 'medium',
    status: initialData.status || 'todo',
    assignedTo: initialData.assignedTo || '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setTicket(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(ticket)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <Input
          type="text"
          id="title"
          name="title"
          value={ticket.title}
          onChange={handleChange}
          required
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <Textarea
          id="description"
          name="description"
          value={ticket.description}
          onChange={handleChange}
          rows={3}
          className="mt-1"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
        <Select name="priority" value={ticket.priority} onValueChange={(value) => setTicket(prev => ({ ...prev, priority: value }))}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <Select name="status" value={ticket.status} onValueChange={(value) => setTicket(prev => ({ ...prev, status: value }))}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="inProgress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
        <Select name="assignedTo" value={ticket.assignedTo} onValueChange={(value) => setTicket(prev => ({ ...prev, assignedTo: value }))}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map(user => (
              <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{initialData.id ? 'Update Ticket' : 'Create Ticket'}</Button>
    </form>
  )
}
