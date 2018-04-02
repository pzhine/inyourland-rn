const dims = {
  width: 225,
  height: 150,
}

const styles = {
  container: {
    ...dims,
    position: 'relative',
  },
  shadowImage: {
    ...dims,
    position: 'absolute',
    zIndex: 1,
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    borderRadius: 10,
  },
  image: {
    ...dims,
    borderRadius: 10,
    overflow: 'hidden',
    zIndex: 2,
    position: 'absolute',
  },
  dims: {
    ...dims,
    borderRadius: 10,
  },
}

export default styles
