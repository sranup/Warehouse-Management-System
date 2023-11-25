import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const store = configureStore()

console.log(store.getState())
store.subscribe(() => {
  console.log('updated state', store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>)