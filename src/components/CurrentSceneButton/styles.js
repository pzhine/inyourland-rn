import { mixins } from '../../shared-styles'

const padding = 5

const styles = {
  currentSceneButton: {
    position: 'absolute',
    right: 35,
    top: 35,
  },
  button: {
    ...mixins.button,
    paddingLeft: padding,
    paddingRight: padding,
    paddingTop: padding,
    paddingBottom: padding,
  },
  image: {
    width: 100,
    height: 67,
    borderRadius: mixins.button.borderRadius - padding,
    zIndex: 0,
  },
  captionText: {
    fontFamily: 'System',
    fontWeight: '100',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
}
export default styles
