import { mixins } from '../../shared-styles'

const arrowDims = {}

const arrowButton = {
  ...mixins.centerBoth,
  width: 100,
  height: 120,
  flex: 0,
}

const styles = {
  navControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    width: 680,
    top: 810,
  },
  prevButton: {
    ...arrowButton,
  },
  prevArrow: {
    ...arrowDims,
  },
  nextButton: {
    ...arrowButton,
  },
  nextArrow: {
    ...arrowDims,
    transform: [{ rotate: '180deg' }],
  },
  detailsButton: {
    ...mixins.button,
  },
  detailsButtonText: {
    ...mixins.buttonText,
  },
}

export default styles
