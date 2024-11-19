import React from 'react'

export function Select({ children, ...props }) {
  return (
    <select
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function SelectValue({ children, ...props }) {
  return <span {...props}>{children}</span>
}

export function SelectContent({ children, ...props }) {
  return <div {...props}>{children}</div>
}

export function SelectItem({ children, ...props }) {
  return <option {...props}>{children}</option>
}