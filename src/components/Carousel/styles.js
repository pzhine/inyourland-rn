const styles = {
  carousel: {
    flexDirection: 'row',
    position: 'relative',
    backgroundColor: 'rgba(120,120,120,0.04)',
    height: 1024,
    overflow: 'visible',
  },
  slide: {
    marginRight: 5,
    marginLeft: 5,
    position: 'relative',
    bottom: 60,
  },
  blurLayer: {
    top: 450,
    left: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -1,
    opacity: 0.6,
  },
  title: {
    position: 'absolute',
    left: 0,
    top: 575,
    right: 0,
    textAlign: 'center',
  },
}

export default styles
