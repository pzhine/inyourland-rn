import { mixins } from '../../shared-styles'

const styles = {
  subject: {
    ...mixins.fillContainerAbsolute,
    paddingLeft: 40,
    paddingRight: 40,
  },
  nav: {
    borderTopColor: 'rgba(255,255,255,0.5)',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    height: 96,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  content: {
    position: 'absolute',
    top: 350,
    alignSelf: 'center',
  },
}

export default styles
