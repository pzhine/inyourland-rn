import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'
import { createLogger } from 'redux-logger'
import throttle from 'redux-throttle'
import thunk from 'redux-thunk'
import app from './app/reducer'
import scene from './scene/reducer'
import config from '../../config.json'

const reducer = combineReducers({ app, scene })
const ioClient = io(config.serverUrl)
ioClient.on('disconnect', reason => {
  console.log('⚠️  socket.io disconnect', reason)
  if (reason === 'io server disconnect') {
    ioClient.connect()
  }
})
const middlewares = [
  thunk,
  createSocketIoMiddleware(ioClient, 'server/'),
  throttle(),
]
if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger())
}
const enhancer = applyMiddleware(...middlewares)

export default createStore(reducer, {}, enhancer)
