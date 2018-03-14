import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Map from './'
import Carousel from '../Carousel'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream0.json'
import locations from '../../../content/locations.json'
import storyStyles from '../../../storybook/styles'
import absmod from '../../lib/absmod'

const getLocation = locationId =>
  locations.find(loc => loc.locationId === locationId)

storiesOf('Map', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  // .add('default', () => <Map location={getLocation(scenes[0].locationId)} />)
  .add('autoPlay', () => (
    <AutoPlay interval={1}>
      {sceneIndex => (
        <Map
          location={getLocation(
            scenes[absmod(sceneIndex, scenes.length)].locationId
          )}
        />
      )}
    </AutoPlay>
  ))
// .add('autoPlay with Carousel', () => (
//   <AutoPlay interval={1}>
//     {sceneIndex => [
//       <Map
//         location={getLocation(
//           scenes[absmod(sceneIndex, scenes.length)].locationId
//         )}
//       />,
//       <Carousel scenes={scenes} currentIndex={sceneIndex} />,
//     ]}
//   </AutoPlay>
// ))
// .add('autoPlay with Carousel and Hotspot', () => (
//   <AutoPlay interval={1}>
//     {sceneIndex => {
//       const loc = getLocation(
//         scenes[absmod(sceneIndex, scenes.length)].locationId
//       )
//       return [
//         <Map location={loc} />,
//         <Carousel scenes={scenes} currentIndex={sceneIndex} />,
//         <Hotspot
//           left={loc.pin[0]}
//           top={loc.pin[1]}
//           radius={24}
//           ripples={3}
//           color={variables.colors.hotspot}
//         />,
//       ]
//     }}
//   </AutoPlay>
// ))
