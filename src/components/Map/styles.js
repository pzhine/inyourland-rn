import { mixins } from '../../shared-styles'

const styles = {
  blurViewContainer: {
    ...mixins.fillContainerAbsolute,
  },
  blurView: {
    ...mixins.fillContainerAbsolute,
  },
  map: {
    width: 3000,
    height: 2926,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  hotspot: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
}

export default styles
