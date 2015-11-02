const fs = require( 'fs' )
const Canvas = require( '../../hrm-draw' ).Canvas

const random = r => 
  Math.floor( Math.random() * ( r || 65535 ) )

const randomPoint = () =>
  [ random(), random() ]
  
const randomPath = () => {
  const length = Math.floor( Math.random() * 5 ) + 2
  const path = []
  for( var i = 0; i < length; i++ ){
    path.push( randomPoint() )
  }
  return path
}   

const randomAscii = () =>
  String.fromCharCode( Math.floor( Math.random() * 93 ) + 33 )

const canvas = Canvas()

canvas.add( randomPoint() )
canvas.add( randomPoint() )
canvas.add( randomPoint() )
canvas.add( randomPath() )
canvas.text( randomAscii(), random( 40000 ), random( 40000 ) )
canvas.text( randomAscii(), random( 40000 ), random( 40000 ) )
canvas.text( randomAscii(), random( 40000 ), random( 40000 ) )

const svgText = canvas.toSvg()
fs.writeFile( 'random.svg', svgText, 'utf8' )

const hrmText = canvas.toAsm()
fs.writeFile( 'random.asm', hrmText, 'utf8' )
