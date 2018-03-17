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
    opacity: 0.7,
    padding: 20,
    transform: [{ scaleX: 1.15 }, { scaleY: 1.15 }],
    borderRadius: 10,
  },
  image: {
    ...dims,
    position: 'absolute',
    zIndex: 2,
    borderRadius: 10,
  },
}

export default styles
