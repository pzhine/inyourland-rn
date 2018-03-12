import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import WebApp from '../components/WebApp'

// We need a Root component for React Hot Loading.
function Root() {
  return (
    <Router>
      <WebApp />
    </Router>
  )
}

export default Root
