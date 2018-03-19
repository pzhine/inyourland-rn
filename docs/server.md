# Server

* should start on system startup

## Startup

* should scan the network for chromecast devices
* should start playing video sources and for each stream

  * query chromecast for a current play position
  * set a timer for the next scene advance

## API

* `GET /session/new`
  * should start session timer
  * returns a sessionid
* `GET /session/:sessionid/register/:phone`
  * saves phone number to session
* `GET /session/:sessionid/like/:sceneindex`
  * should reset session timer
  * records a like in the user session
* `GET /session/:sessionid/keepalive/:actiontag`
  * should reset session time
  * records action tag in user session for analytics

## Session timer

* should flag session as closed in the database

## On client connect

* should lookup `mediaId` in `media.json` by `clientIp` from `io.on('connect')`
* should add/update `socketId` in `mediaMap` with key `mediaId`

## Scene timer

* should lookup `socketId` in `mediaMap` by `mediaId` passed to timer
* should emit a `sceneAdvance` event to socket listener, with new scene index
* should query chromecast for current play position
* should log alert notification and attempt restart if chromecast is unresponsive or not playing
* should calculate time remaining for the current scene
* should set a timer for the next scene advance

## Notifier

* should watch the `alerts` db collection for changes and send sms alerts
* should watch the `sessions` db collection for changes and send sms to user when session is closed AND has an email address AND has likes
