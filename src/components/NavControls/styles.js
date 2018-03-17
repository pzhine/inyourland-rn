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

    justifySelf: 'flex-start',
  },
  prevArrow: {
    ...arrowDims,
  },
  nextButton: {
    ...arrowButton,
    justifySelf: 'flex-end',
  },
  nextArrow: {
    ...arrowDims,
    transform: [{ rotate: '180deg' }],
  },
  detailsButton: {
    ...mixins.button,
    justifySelf: 'center',
  },
  detailsButtonText: {
    ...mixins.buttonText,
  },
}

export default styles
