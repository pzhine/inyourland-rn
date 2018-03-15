import { mixins } from '../../shared-styles'

const styles = {
  button: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  text: {
    ...mixins.navText,
  },
  active: {
    position: 'absolute',
    fontWeight: 'bold',
  },
}

export default styles
