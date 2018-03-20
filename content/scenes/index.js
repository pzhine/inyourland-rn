// automatically import all files ending in *.json
const req = require.context('./src', true, /\.json$/)

const sceneMap = req.keys().reduce(
  (map, filename) => ({
    ...map,
    [filename.replace('.json', '')]: req(filename),
  }),
  {}
)

export default sceneMap
