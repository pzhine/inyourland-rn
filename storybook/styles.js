import { mixins, variables } from '../src/shared-styles'

const styles = {
  container: {
    ...mixins.centerBoth,
    height: '100%',
    backgroundColor: variables.colors.appBackground,
  },
}

export default styles
