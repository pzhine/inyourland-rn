import { variables, mixins } from '../../shared-styles'

const styles = {
  container: {
    ...mixins.centerBoth,
    height: '100%',
    backgroundColor: variables.colors.appBackground,
  },
  titleText: {
    ...mixins.titleFont,
  },
  button: {
    ...mixins.button,
  },
  buttonText: {
    ...mixins.buttonFont,
  },
  paragraphText: {
    ...mixins.paragraphFont,
  },
}

export default styles
