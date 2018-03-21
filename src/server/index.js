import 'babel-polyfill'
import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import compression from 'compression'
import path from 'path'
import cors from 'cors'
import template from './template'
import config from '../../content/config.json'
import kytConfig from '../../kyt.config'
import startScenes from '../lib/scene/start'
import mediaList from '../../content/media.json'

const clientAssets = require(KYT.ASSETS_MANIFEST) // eslint-disable-line import/no-dynamic-require
const port = process.env.PORT || parseInt(KYT.SERVER_PORT, 10)

const expressApp = express()
const server = http.createServer(expressApp)

const getClientAsset = ({ name, req }) => {
  if (!clientAssets[name]) {
    return null
  }
  if (process.env.NODE_ENV === 'development') {
    return clientAssets[name].replace(
      kytConfig.clientURL,
      `http://${req.hostname}:3001`
    )
  }
  return clientAssets[name]
}

// Remove annoying Express header addition.
expressApp.disable('x-powered-by')

// Compress (gzip) assets in production.
expressApp.use(compression())

// Setup the public directory so that we can serve static assets.
expressApp.use(express.static(path.join(process.cwd(), KYT.PUBLIC_DIR)))

// Setup the receiver directory
expressApp.use(
  '/receiver',
  express.static(path.join(process.cwd(), 'receiver'))
)

// Setup the media directory with CORS.
expressApp.use(
  '/media',
  cors(),
  express.static(path.join(process.cwd(), 'media'))
)

// Setup server-side routing.
expressApp.get('*', (req, res) =>
  res.status(200).send(
    template({
      title: config.siteTitle,
      manifestJSBundle: getClientAsset({ name: 'manifest.js', req }),
      mainJSBundle: getClientAsset({ name: 'main.js', req }),
      vendorJSBundle: getClientAsset({ name: 'vendor.js', req }),
      mainCSSBundle: getClientAsset({ name: 'main.css', req }),
    })
  )
)

const ipv4 = ip => ip.replace('::ffff:', '')

// initialize socket listener
const io = socketio(server)
io.on('connection', socket => {
  console.log('client connected', socket.handshake.address)
  // add sockedId to mediaList entry
  mediaList.find(
    m => m.clientIp === ipv4(socket.handshake.address)
  ).socket = socket
})

// start scene player and sync
if (process.argv[2] === 'startScenes') {
  startScenes({ io, mediaList })
}

server.listen(port, () => {
  console.log(`✅  server started on port: ${port}`) // eslint-disable-line no-console
})
