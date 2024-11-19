import React, { useState } from 'react'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

export default function Comments({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      setNewComment('')
    }
  }

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <ul className="space-y-2">
        {comments.map((comment, index) => (
          <li key={index} className="bg-gray-100 p-2 rounded">
            <p className="text-sm">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              By {comment.user} on {new Date(comment.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <Input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow"
        />
        <Button type="submit" className="ml-2">Add</Button>
      </form>
    </div>
  )
}