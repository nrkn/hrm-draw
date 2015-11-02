const fs = require( 'fs' )
const Canvas = require( '../../hrm-draw' ).Canvas

const canvas = Canvas()

canvas.text( 'Hello\nWorld!' )

const svgText = canvas.toSvg()
fs.writeFile( 'hello-world.svg', svgText, 'utf8' )

const hrmText = canvas.toAsm()
fs.writeFile( 'hello-world.asm', hrmText, 'utf8' )
