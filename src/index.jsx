import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles/tailwind.css'
import './styles/custom.css'
import './styles/typography.css'

import { NotesProvider } from './context/NoteContext'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
)
