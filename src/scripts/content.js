import request from 'request'
import csv from 'csvtojson'
import fs from 'fs'

function convert(url, path, transform) {
  const out = fs.createWriteStream(path)
  let isFirst = true
  out.write('[')

  csv()
    .fromStream(request.get(url))
    .on('json', json => {
      let jsonOut = json
      const exclude = jsonOut.exclude
      delete jsonOut.exclude
      if (transform) {
        jsonOut = transform(jsonOut)
      }
      if (!exclude) {
        if (isFirst) {
          isFirst = false
        } else {
          out.write(',\n')
        }

        out.write(JSON.stringify(jsonOut, null, 2))
      }
    })
    .on('done', err => {
      if (err) {
        console.error('convert failed', err)
        return
      }
      out.write(']')
      out.end()
    })
}

convert(
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSvZaMFjZQGnjMm7P-AbS51W9pvTJtOuuY0gviLK5_yPe8WLXdw2_fRKlt-7IybvI2oVxEQn5VJQ6rw/pub?gid=0&single=true&output=csv',
  './content/scenes/stream01.json',
  json => ({ ...json, thumbFilename: `stream01/${json.thumbFilename}` })
)
