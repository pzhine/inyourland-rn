import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Redirect } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import AutoPlay from '../../../storybook/AutoPlay'
import storyStyles from '../../../storybook/styles'
import SubjectRoute from './route'

storiesOf('screens/Subject', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>{story()}</View>
    </NativeRouter>
  ))
  .add('default', () => (
    <React.Fragment>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/subject/americanblackduck/about" />}
      />
      <SubjectRoute />
    </React.Fragment>
  ))
  .add('nav to subject', () => (
    <React.Fragment>
      <AutoPlay interval={1}>
        {currentIndex =>
          currentIndex % 2 ? (
            <Redirect to="/subject/americanblackduck/about" />
          ) : (
            <Redirect to="/" />
          )
        }
      </AutoPlay>
      <SubjectRoute />
    </React.Fragment>
  ))
