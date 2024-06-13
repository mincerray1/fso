//import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
//import './index.css'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter={counter} />
)