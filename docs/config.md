Config
------
#### `config.json`
Should be a map of global application settings
- `hostname` - the ip address or domain name of the server
- `sessionDuration` - session timeout in seconds

#### `media.json`
Should be a list of video sources with metadata including:
- `mediaId` - the uid used to reference this stream in the application
- `sourceFilename` - the filename of the video source
- `deviceId` - the uid of the chromecast device that will play the video
- `duration` - duration of the video in milliseconds

#### `locations.json`
Should be a list of photography locations with metadata including:
- `locationId` - the uid used to reference this location in the application
- `latlongzoom` - the latitude/longitude/zoom string from google maps
- `name` - the descriptive name of the location

#### `subjects.json`
Should be a list of subjects that appear in scenes, in the following schema:
- `subjectId` - the uid used to reference these details in the application
- `name` - display name of this subject
- `bio` - array of:
  - `title` - name of bio section
  - `content` - content of detail

#### `scenes/[mediaId].json`
Should be a list of scenes with metadata, including:
- `startTime` - time distance in milliseconds from the beginning of the stream to the start of the scene
- `thumbFilename` - filename of thumb image to load
- `locationId` - id of location where the scene was photographed
- `subjectId` - id of the subject of this scene
