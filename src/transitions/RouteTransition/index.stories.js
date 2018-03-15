import React from 'react'
import { Text, View, Animated } from 'react-native'
import { NativeRouter, Link, Route, Redirect } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import RouteTransition from './'
import { variables } from '../../shared-styles'

storiesOf('RouteTransition', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>
        <Route exact path="/" render={() => <Redirect to="/1" />} />
        <Route
          path="/:pageNum"
          render={({ match }) => [
            <View key={1}>{story()}</View>,
            <Link
              key={2}
              to={(parseInt(match.params.pageNum, 10) + 1).toString()}
            >
              <Text style={storyStyles.text}>Next Page</Text>
            </Link>,
          ]}
        />
      </View>
    </NativeRouter>
  ))
  .add('fade in/out', () => (
    <RouteTransition
      holdDuration={variables.transitions.fadeRoute.duration}
      animations={{
        fade: {
          range: [0, 1],
          method: Animated.timing,
          duration: variables.transitions.fadeRoute.duration,
        },
      }}
    >
      {({ animations, match, nextMatch }) => [
        <Animated.Text
          key={1}
          style={{ ...storyStyles.text, opacity: animations.fade }}
        >
          {match.params.pageNum}
        </Animated.Text>,
        <Text style={{ ...storyStyles.text }} key={2}>
          {(nextMatch && nextMatch.params.pageNum) || match.params.pageNum}
        </Text>,
      ]}
    </RouteTransition>
  ))
