# Client

## Startup

* should lookup `mediaId` in `media.json` by `clientIp` from [react-native-network-info](https://github.com/pusherman/react-native-network-info)
* should open a socketIO connection to server to listen for scene changes

## On user interaction

* should start a session if necessary: `GET /session/new`
* should reset session timer
* should extend session and log action: `GET /session/:sessionid/keepalive/:actiontag`  
  actiontag can be:
  * `NEXT_SCENE` - user advanced to next scene
  * `PREV_SCENE` - user rewound to previous scene
  * `DETAIL` - user viewed details
  * `DETAIL_CLOSE` - user closed details
  * `DETAIL_NAV` - user navigated within details
  * `REGISTER_CANCEL` - user cancelled phone input

## On session timer

* should set `currentSceneIndex` to latest from server
* should redirect to navigator screen

## On scene change

* should update `currentSceneIndex`
* should advance UI to current scene if there's no active session

## On Like

* should show the phone entry modal if no phone exists in session
* should save the like: `GET /session/:sessionid/like/:sceneindex`

## Routes

* should be `/` for scene navigator
* should be `/subject/1/about` for subject content browser
* should be `/share/1` for share screen
