const fs = require( 'fs' )
const draw = require( '../../hrm-draw' )
const Canvas = draw.Canvas

fs.readFile( 'image.txt', 'utf8', ( err, data ) => {
  if( err ) throw err
  
  const canvas = Canvas( data )

  const svg = canvas.toSvg()
  
  fs.writeFile( 'image.svg', svg, 'utf8' )
})