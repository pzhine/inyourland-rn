import React from 'react'
import { Text, View, Animated } from 'react-native'
import { NativeRouter, Link, Route, Redirect } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import RouteTransition from './'
import { variables } from '../../shared-styles'

storiesOf('transitions/RouteTransition', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>
        <Route exact path="/" render={() => <Redirect to="/1" />} />
        <Route
          path="/:pageNum"
          render={({ match }) => (
            <React.Fragment>
              <View>{story()}</View>
              <Link to={(parseInt(match.params.pageNum, 10) - 1).toString()}>
                <Text style={storyStyles.text}>Prev Page</Text>
              </Link>
              <Link to={(parseInt(match.params.pageNum, 10) + 1).toString()}>
                <Text style={storyStyles.text}>Next Page</Text>
              </Link>
              <Text style={{ ...storyStyles.text }}>
                /{match.params.pageNum}
              </Text>
            </React.Fragment>
          )}
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
      {({ animations, match }) => (
        <Animated.Text
          key={1}
          style={{ ...storyStyles.text, opacity: animations.fade }}
        >
          {match.params.pageNum}
        </Animated.Text>
      )}
    </RouteTransition>
  ))
  .add('show on /1', () => (
    <RouteTransition
      holdDuration={variables.transitions.fadeRoute.duration}
      animations={{
        fade: {
          range: [0, 1],
          method: Animated.timing,
          duration: variables.transitions.fadeRoute.duration,
          isIn: nextMatch => nextMatch.params.pageNum === '1',
        },
      }}
    >
      {({ animations }) => [
        <Animated.Text
          key={1}
          style={{ ...storyStyles.text, opacity: animations.fade }}
        >
          Only on 1
        </Animated.Text>,
      ]}
    </RouteTransition>
  ))
