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
    marginLeft: 12,
    marginRight: 12,
    fontWeight: '100',
  },
  active: {
    position: 'absolute',
    fontWeight: '300',
  },
}

export default styles
