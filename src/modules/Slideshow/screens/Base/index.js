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
    const { currentSceneIndex } = this.props
    if (
      nextProps.currentSceneIndex !== currentSceneIndex &&
      this.isTransitioningToSubject
    ) {
      setTimeout(() => {
        this.navToSubject(nextProps)
        this.isTransitioningToSubject = false
      }, 400)
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
    this.isTransitioningToSubject = true
    if (sceneIndex !== currentSceneIndex) {
      this.props.changeScene(sceneIndex)
    } else {
      this.navToSubject(this.props)
    }
  }
  render() {
    console.log('base.render', this.props.currentSceneIndex)
    return (
      <React.Fragment>
        <Map {...this.props} />
        <Carousel
          {...this.props}
          onSlidePress={sceneIndex => this.onSlidePress(sceneIndex)}
        />
      </React.Fragment>
    )
  }
}

export default compose(withRouter, connect(null, actions))(Base)
