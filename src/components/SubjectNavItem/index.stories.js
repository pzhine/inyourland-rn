import React from 'react'
import { View } from 'react-native'
import { NativeRouter, Route, Redirect } from 'react-router-native'
import { storiesOf } from '@storybook/react-native'
import storyStyles from '../../../storybook/styles'
import SubjectNavItem from './'
import subjects from '../../../content/subjects.json'

const navContainerStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  height: 150,
}

storiesOf('components/SubjectNavItem', module)
  .addDecorator(story => (
    <NativeRouter>
      <View style={storyStyles.container}>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/subject/americanblackduck/about" />}
        />
        <View style={navContainerStyle}>{story()}</View>
      </View>
    </NativeRouter>
  ))
  .add('default', () =>
    subjects[0].bio.map(section => (
      <SubjectNavItem section={section} key={section.sectionId} />
    ))
  )
