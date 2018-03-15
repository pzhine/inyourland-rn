import { mixins, variables } from '../src/shared-styles'

const styles = {
  container: {
    ...mixins.centerBoth,
    height: '100%',
    backgroundColor: variables.colors.appBackground,
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
}

export default styles
