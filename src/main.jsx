import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA = [
  { id: "workout-0", name: "Morning Run", completed: false },
  { id: "workout-1", name: "Yoga Session", completed: false },
  { id: "workout-2", name: "Strength Training", completed: false },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
)
