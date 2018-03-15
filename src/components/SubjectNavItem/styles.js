import { mixins } from '../../shared-styles'

const styles = {
  subjectNavItem: {
    position: 'relative',
  },
  text: {
    ...mixins.navText,
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
  },
  active: {
    position: 'relative',
    fontWeight: 'bold',
  },
}

export default styles
