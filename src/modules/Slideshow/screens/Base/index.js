import React from 'react'
import { withRouter } from 'react-router-native'
import { connect } from 'react-redux'
import { compose } from 'redux'
import actions from '../../../../redux/scene/actions'
import absmod from '../../../../lib/absmod'

import Map from '../../../../components/Map'
import Carousel from '../../../../components/Carousel'

class Base extends React.Component {
  constructor(props) {
    super(props)
    this.isTransitioningToSubject = false
  }
  componentWillReceiveProps(nextProps) {
    const { currentSceneIndex, location } = this.props
    if (
      nextProps.currentSceneIndex !== currentSceneIndex &&
      this.isTransitioningToSubject
    ) {
      setTimeout(() => {
        this.navToSubject(nextProps)
      }, 400)
    }
    if (location.pathname.match('/subject')) {
      this.isTransitioningToSubject = false
    }
  }
  navToSubject(props) {
    const { currentSceneIndex } = props
    const { scenes, history } = this.props
    history.push(
      `/subject/${
        scenes[absmod(currentSceneIndex, scenes.length)].subjectId
      }/about`
    )
  }
  onSlidePress(sceneIndex) {
    const { currentSceneIndex } = this.props
    if (this.isTransitioningToSubject) {
      return
    }
    this.props.startInteraction()
    if (sceneIndex !== currentSceneIndex) {
      this.isTransitioningToSubject = true
      this.props.changeScene(sceneIndex)
    } else {
      this.navToSubject(this.props)
    }
  }
  render() {
    return (
      <React.Fragment>
        <Map {...this.props} />
        <Carousel
          {...this.props}
          onSlidePress={sceneIndex => this.onSlidePress(sceneIndex)}
          isTransitioningToSubject={this.isTransitioningToSubject}
        />
      </React.Fragment>
    )
  }
}

export default compose(withRouter, connect(null, actions))(Base)
