# In Your Land

Dual channel video installation with interactive tablet app companion and website.

## Documentation

* [config](docs/config.md)
* [server](docs/server.md)
* [client](docs/client.md)
* [chromecast](docs/chromecast.md)

## Setup

Install the dependencies:

```
yarn install
```

## Dev Scripts

```
# Run the web server
yarn dev-server
```

```
# Run the web server and start playing media
yarn dev-server-player
```

```
# Run haul bundler and launch remote debugger
yarn dev-haul
```

```
# Run haul bundler with storybook entrypoint
yarn storybook
```

```
# Build the app and launch it in the simulator
yarn dev-ios
```

## Production scripts

```
# Build the bundle for production with haul
yarn haul-bundle
```

## Questions/comments?

Happy to help: paul@hine.works
