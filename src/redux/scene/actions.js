export default {
  startInteraction() {
    return {
      type: 'START_INTERACTION',
    }
  },
  endInteraction() {
    return {
      type: 'END_INTERACTION',
    }
  },
  nextScene() {
    return {
      type: 'NEXT_SCENE',
    }
  },
  previousScene() {
    return {
      type: 'PREVIOUS_SCENE',
    }
  },
}
