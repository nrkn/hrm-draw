const defaultOptions = require( './options' )
const geometry = require( './geometry' )
const defaultFont = require( './font' )

module.exports = ( str, f, o ) => {  
  const font = f || defaultFont
  const options = Object.assign( {}, defaultOptions, options )

  const lineHeight = ( ( ( font.emSize + 1 ) * 2 ) - 1 ) * options.stroke * options.vscale
  
  const chars = str
    .toUpperCase()
    .split( '' )
    .map( c =>
      ( c === ' ' || c === '\n' || c.charCodeAt( 0 ) in font.glyphs ) ? c : 'X'
    )
    
  var paths = []
  
  var left = 0
  var top = 0
 
  chars.forEach( c => {
    if( c === ' ' ){
      left += options.wordSpacing
      return
    }
    
    if( c === '\n' ){
      left = 0
      top += lineHeight
      return
    }
    
    const code = c.charCodeAt( 0 )
    
    const glyphPaths = geometry.Paths( font.glyphs[ code ] )
      .scale( options.gridSpacing )
      .scale( [ 1, options.vscale ] )
      .offset( [ left, top ] )
    
    left += glyphPaths.width() + options.letterSpacing
    
    paths = paths.concat( glyphPaths.value() )
  })
  
  return paths
}