const styles = {
  carousel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  slidesContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 370,
    overflow: 'visible',
  },
  slide: {
    marginRight: 5,
    marginLeft: 5,
  },
  blurLayer: {
    top: 5,
    left: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -1,
    opacity: 0.7,
  },
  title: {
    position: 'absolute',
    left: 0,
    top: 600,
    right: 0,
    textAlign: 'center',
  },
}

export default styles
