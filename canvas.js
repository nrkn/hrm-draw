const decode = require( 'hrm-image-decoder' )
const encode = require( 'hrm-image-encoder' )
const options = require( './options' )
const geometry = require( './geometry' )
const text = require( './text' )
const svg = require( './svg' )
const asm = require( './asm' )

const Canvas = ( arg ) => {
  const mapper = Object.keys( argToPaths ).find( key =>
    argToPaths[ key ].test( arg )
  )
  
  var value = mapper ? 
    argToPaths[ mapper ].map( arg ) :
    []
    
  return {
    value: () => ensureValid( value ),
    toSvg: () => svg( geometry.Paths( ensureValid( value ) ).scale( [ 1, 1 / options.vscale ] ).value() ),
    toImage: () => encode( ensureValid( value ) ),
    toAsm: () => asm( ensureValid( value ) ),
    add: arg => value = add( value, arg ),
    toString: () => geometry.Paths( ensureValid( value ) ).toString(),
    text: ( str, x, y ) => {
      x = typeof x === 'number' ? x : 0
      y = typeof y === 'number' ? y : 0
      value = add( value, geometry.Paths( text( str ) ).offset( [ x, y ] ).value() )
    }      
  }
}

const argToPaths = {
  image: {
    test: arg => typeof arg === 'string',
    map: arg => decode( arg )
  },
  point: {
    test: geometry.Point.isPoint,      
    map: arg => [ [ arg ] ]
  },
  path: {
    test: geometry.Path.isPath,
    map: arg => [ arg ]
  },
  paths: {
    test: geometry.Paths.isPaths,
    map: arg => arg
  }
}

const add = ( value, arg ) => {
  if( geometry.Point.isPoint( arg ) ){
    value.push( [ arg ] )
    
    return value
  }
  
  if( geometry.Path.isPath( arg ) ){
    value.push( arg )
    
    return value
  }
  
  if( geometry.Paths.isPaths( arg ) ){
    return value.concat( arg )
  }
}

const countPoints = paths => 
  paths.reduce( ( count, path ) => {
    return count + path.length + 1
  }, 0 )
  
const removeLast = p => {
  const paths = p.filter( path => path.length > 0 )
  
  if( paths.length > 0 ){
    const path = paths[ paths.length - 1 ]
    
    path.pop()
  }
}

const inRange = paths => {
  var valid = true
  
  paths.forEach( path => 
    path.forEach( point => {
      if( !valid ) return
      
      valid = point[ 0 ] >= 0 &&
        point[ 0 ] <= 65535 &&
        point[ 1 ] >= 0 &&
        point[ 1 ] <= 65535
    })
  )
  
  return valid
}

const ensureValid = p => {
  var filtered = p.filter( path => path.length > 0 )
  
  var count = countPoints( filtered )
  
  while( count > options.maxPoints ){
    filtered = removeLast( filtered )
    count = countPoints( filtered )
  }
  
  const paths = geometry.Paths( filtered )
  
  const leftMost = paths.left()
  const topMost = paths.top()
  const width = paths.width() + leftMost
  const height = paths.height() + topMost
  
  const inViewport = 
    leftMost >= options.viewBounds.left &&
    topMost >= options.viewBounds.top &&
    width <= options.viewSize.width &&
    height <= options.viewSize.height

  if( inRange( paths.value() ) && inViewport ) 
    return paths( filtered ).floor().value()
  
  const translated = paths.offset( [ -leftMost, -topMost ] )
  
  const scaled = paths.fit( options.viewSize.width, options.viewSize.height )
  
  const offset = scaled.offset( [ options.viewBounds.left, options.viewBounds.top ] )
  
  const valid = offset.floor().value()
  
  return valid
}

module.exports = Canvas