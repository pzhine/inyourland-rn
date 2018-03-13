import { variables, mixins } from '../../shared-styles'

const styles = {
  container: {
    ...mixins.centerBoth,
    height: '100%',
    backgroundColor: variables.colors.appBackground,
  },
  lightText: {
    fontFamily: 'AvenirNext-UltraLight',
    color: variables.colors.appText,
    fontWeight: variables.fonts.lightWeight,
  },
  mediumText: {
    fontFamily: variables.fonts.appFamily,
    color: variables.colors.appText,
    fontWeight: variables.fonts.mediumWeight,
  },
  heavyText: {
    fontFamily: variables.fonts.appFamily,
    color: variables.colors.appText,
    fontWeight: variables.fonts.heavyWeight,
  },
}

export default styles
