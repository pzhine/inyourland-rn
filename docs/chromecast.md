# Chromecast guide

This application uses the Cast v2 Sender and Receiver APIs.

The Receiver app lives in `/receiver` and is essentially a webpage (html and js) that is loaded into the headless browser in the Chromecast.

The Chromecast knows where to find this webpage because when the Sender requests media playback, it provides an APP_ID. The Chromecast sends this APP_ID to Google and Google sends back the URL of the receiver app.

### Registering the Receiver app

The Receiver app has not been officially published (like the "YouTube" or "NetFlix" receiver apps, for example), so you'll have to register your own instance with Google:

* Open the Chromecast Developer Console [Chromecast Developer Console](https://cast.google.com/publish)
* Click "Add new Application"
* Click "Custom Receiver"
* Give it a name
* Set receiver application URL to: `http://x.x.x.x:3000/receiver`, where x.x.x.x is the IP address to the server where this app is running. You should make this a reserved address in your router's DHCP settings so that this always works. Another option is to make the receiver available on a public server.
* Turn off Guest Mode (you don't want someone hijacking your gallery screen with their smartphone!).
* Save the settings.
* Copy the Application Id of the new application and put it in `/config.json` as the value for "receiverAppId".

Because the Receiver app is unpublished, it will only load on devices registered in your console. So, after registering the application, click "Add new Device" and enter the serial number of your Chromecast. You will need to do this for all of your Chromecasts, of course.

### Converting video

The Receiver app loops infinitely by continuously filling the video render buffer. This requires that the mpeg header information be moved to the front of the file and that the file is fragmented for streaming.

Run:

```
brew install MP4Box
MP4Box -dash 1000 -rap -frag-rap videofile.mp4
```

Where `videofile.mp4` is the media to play. You need to run the MP4Box command on each media stream you want to play.

This will generate `videofile_dashinit.mp4` files, which is the filename you want to use in `src/config/media.json`.
