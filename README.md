React Native Starter Kit
========================

A starter kit for React Native apps inspired on [kyt](https://github.com/NYTimes/kyt) by [@pzhine](https://github.com/pzhine).

Includes the following:
- ES6 Stage 3
- ESlint
- React Native
- Redux
- React Router v4
- Webfonts
- Haul, a Webpack-based React native bundler
- Webpack with SVG, JSON and font loaders
- Common app components: App, Nav
- Transition components: Fade
- Utility components: Raw, ScrollManager
- Testing with Enzyme and Jest (using react-native-mock)
- Storybook for prototyping
- Back end API scaffold using Express

Getting Started
---------------
1. Install the dependencies:
```
yarn install
```

2. Configure the site in `/src/content/config.json` and add a custom favicon in `/src/public`
3. Add some menu items in `/src/content/menu.json`
4. Test your setup
```
yarn test
```

5. Run the Haul bundler and then launch the simulator
```
yarn haul
yarn start
```

6. Run the Storybook component prototyping app
```
yarn storybook
react-native run-ios
```

Questions/comments?
--------------------------
Happy to help: paul@hine.works
