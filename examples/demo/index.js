const fs = require( 'fs' )
const draw = require( '../../hrm-draw' )
const Paths = draw.geometry.Paths
const Canvas = draw.Canvas

const canvas = Canvas()

canvas.text( 'hrm-draw' )

fs.readFile( 'face.txt', 'utf8', ( err, faceData ) => {
  if( err ) throw err
  
  var facePaths = Paths( faceData ).scale([ 16, 48 ]).offset([ 17000, 20500 ]).floor()
  
  canvas.add( facePaths.value() )
  
  const svgText = canvas.toSvg()
  fs.writeFile( 'demo.svg', svgText, 'utf8' )

  const hrmText = canvas.toAsm()
  fs.writeFile( 'demo.asm', hrmText, 'utf8' )  
})