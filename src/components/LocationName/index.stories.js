import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import LocationName from './'
import AutoPlay from '../../../storybook/AutoPlay'
import scenes from '../../../content/scenes/stream0.json'
import locations from '../../../content/locations.json'
import storyStyles from '../../../storybook/styles'
import absmod from '../../lib/absmod'

const getLocation = locationId =>
  locations.find(loc => loc.locationId === locationId)

storiesOf('LocationName', module)
  .addDecorator(story => <View style={storyStyles.container}>{story()}</View>)
  .add('autoPlay', () => (
    <AutoPlay interval={1}>
      {sceneIndex => (
        <LocationName
          location={getLocation(
            scenes[absmod(sceneIndex, scenes.length)].locationId
          )}
        />
      )}
    </AutoPlay>
  ))
