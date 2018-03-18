import { variables, mixins } from '../../shared-styles'

const styles = {
  container: {
    ...mixins.centerBoth,
    height: '100%',
    backgroundColor: variables.colors.appBackground,
  },
}

export default styles
