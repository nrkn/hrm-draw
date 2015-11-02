const options = require( './options' )

const width = options.size.width
const height = options.size.height / options.vscale
const stroke = options.stroke

const pathsToSvg = paths =>  
  `<svg width="100%" height="auto" viewBox="0 0 ${ width } ${ height }" xmlns="http://www.w3.org/2000/svg">\n${
    paths.map( pathToSvg ).join( '\n' )
  }\n</svg>`

const pathToSvg = path =>
  `  <path fill="transparent" stroke="black" stroke-width="${ stroke }" stroke-linecap="round" stroke-linejoin="round" d="M ${
    path.map( pointToSvg ).join( ' L ' )
  } l 0 0" />`
  
const pointToSvg = p =>
  p[ 0 ] + ' ' + p[ 1 ]

module.exports = pathsToSvg