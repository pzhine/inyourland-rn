Server
======

- should start on system startup

Startup
-------
- should scan the network for chromecast devices
- should start playing video sources and
  - query each chromecast for a current play position
  - set a timer for the next scene advance
  
API
---
- `GET /scene/:mediaid` 
  - returns current scene index for the specified stream
- `GET /session/new` 
  - should start session timer
  - returns a sessionid
- `GET /session/:sessionid/register/:phone`
  - saves phone number to session
- `GET /session/:sessionid/like/:sceneindex`
  - should reset session timer
  - records a like in the user session
- `GET /session/:sessionid/keepalive/:actiontag`
  - should reset session time
  - records action tag in user session for analytics

Session timer
-------------
- should flag session as closed in the database

Scene timer
-----------
- should emit a `sceneAdvance` event to socketIO listeners, with new scene index
- should query each chromecast for a current play position
- set a timer for the next scene advance
- if chromecast is unresponsive or not playing, log alert notification and attempt restart

Notifier
--------
- should watch the `alerts` db collection for changes and send sms alerts
- should watch the `sessions` db collection for changes and send sms to user when session is closed AND has an email address AND has likes

