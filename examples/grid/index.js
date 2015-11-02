const fs = require( 'fs' )
const options = require( '../../options' )
const Canvas = require( '../../canvas' )

const grid = {
  columns: Math.floor( options.viewSize.width / options.gridSpacing ),
  rows: Math.floor( ( options.viewSize.height / options.gridSpacing ) / options.vscale ),
}

const gridBounds = {
  right: grid.columns * options.gridSpacing + options.strokeOffset,
  bottom: grid.rows * options.gridSpacing * options.vscale + options.strokeOffset
}

const gridPaths = []

for( var y = 0; y <= grid.rows; y++ ){
  var yOff = ( ( y * options.gridSpacing ) * options.vscale ) + options.viewBounds.top
  
  var start = [ options.viewBounds.left, yOff ]
  var end = [ gridBounds.right, yOff ]
  
  gridPaths.push( [ start, end ] )
}

for( var x = 0; x <= grid.columns; x++ ){
  var xOff = ( x * options.gridSpacing ) + options.viewBounds.left
  
  var start = [ xOff, options.viewBounds.top ]
  var end = [ xOff, gridBounds.bottom + options.stroke ]
  
  gridPaths.push( [ start, end ] )  
}

const canvas = Canvas( gridPaths )

const hrmGrid = canvas.toAsm()
const svgPaths = canvas.toSvg()

fs.writeFile( 'grid.asm', hrmGrid, 'utf8' )
fs.writeFile( 'grid.svg', svgPaths, 'utf8' )