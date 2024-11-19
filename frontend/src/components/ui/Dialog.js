import React, { useState } from 'react'

export function Dialog({ children, ...props }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  )
}

export function DialogTrigger({ children, setIsOpen }) {
  return React.cloneElement(children, {
    onClick: () => setIsOpen(true),
  })
}

export function DialogContent({ children, isOpen, setIsOpen }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {children}
        <button
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          onClick={() => setIsOpen(false)}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>
}