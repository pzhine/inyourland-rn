import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Redirect } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import Subject from './'

storiesOf('screens/Subject', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/subject/0/about" />}
        />
        {story()}
      </View>
    </NativeRouter>
  ))
  .add('default', () => <Subject />)
