const Point = point => {
  const value = typeof point === 'string' ?
    stringToPoint( point ) :
    Point.isPoint( point ) ?
      point :        
      [ point.x, point.y ]
      
  return {
    meta: Meta( 'Point', Point ),
    value: () => value,
    left: () => point[ 0 ],
    top: () => point[ 1 ],
    offset: by =>
      Point( offsetPoint( value, by ) ),
    scale: by =>
      Point( scalePoint( value, by ) ),
    floor: () =>
      Point( floorPoint( value ) ),
    toSvgPath: () => 
      svgPoint( value ),
    toString: () =>
      stringPoint( value )
  }
}  
 
const Path = path => {
  const value = typeof path === 'string' ?
    stringToPath( path ) :
    path
    
  return {
    meta: Meta( 'Path', Path ),
    value: () => value,
    left: () => leftPath( value ),
    top: () => topPath( value ),
    right: () => rightPath( value ),
    bottom: () => bottomPath( value ),
    width: () => widthPath( value ),
    height: () => heightPath( value ),
    offset: by =>
      Path( offsetPath( value, by ) ),
    scale: by =>
      Path( scalePath( value, by ) ),
    floor: () =>
      Path( floorPath( value ) ),
    toSvgPath: () =>
      svgPath( value ),
    toString: () =>
      stringPath( value )
  }  
}
  
const Paths = paths => {
  const value = typeof paths === 'string' ?
    stringToPaths( paths ) :
    paths
    
  return {
    meta: Meta( 'Paths', Paths ),
    value: () => value,
    left: () => leftPaths( value ),
    top: () => topPaths( value ),
    right: () => rightPaths( value ),
    bottom: () => bottomPaths( value ),
    width: () => widthPaths( value ),
    height: () => heightPaths( value ),    
    offset: by =>
      Paths( offsetPaths( value, by ) ),
    scale: by =>
      Paths( scalePaths( value, by ) ),
    fit: ( width, height ) => 
      Paths( fitPaths( value, width, height ) ),  
    floor: () =>
      Paths( floorPaths( value ) ),  
    toSvgPath: () =>
      svgPaths( value ),
    toString: () =>
      stringPaths( value )
  }
}

const Meta = ( name, factory ) => {
  return { name, factory }
}

const isPoint = obj =>
  Array.isArray( obj ) && 
  obj.length === 2 &&
  typeof obj[ 0 ] === 'number' &&
  typeof obj[ 1 ] === 'number'
  
const isPath = obj =>
  Array.isArray( obj ) &&
  obj.every( Point.isPoint )
  
const isPaths = obj =>
  Array.isArray( obj ) &&
  obj.every( Path.isPath )

const mapPaths = ( paths, pathMapper, arg ) => 
  paths.map( path =>
    pathMapper( path, arg )
  )
  
const mapPath = ( path, pointMapper, arg ) =>
  path.map( point =>
    pointMapper( point, arg )
  )

const stringToPoint = str =>
  str
    .trim()
    .split( ',' )
    .map( s =>
      Number( s )
    )
    
const stringToPath = str =>
  str
    .trim()
    .split( ' ' )
    .filter( s =>
      s !== ''
    )
    .map( stringToPoint )
    
const stringToPaths = str =>
  str
    .trim()
    .split( '\n' )
    .filter( s =>
      s !== ''
    )
    .map( stringToPath )
    
const spacePoint = ( point, spacing ) =>
  [ point[ 0 ] * spacing, point[ 1 ] * spacing ]

const spacePath = ( path, spacing ) =>
  mapPath( path, spacePoint, spacing )

const spacePaths = ( paths, spacing ) =>
  mapPaths( paths, spacePath, spacing )
  
const offsetPoint = ( point, offset ) =>
  Array.isArray( offset ) ?
    [ point[ 0 ] + offset[ 0 ], point[ 1 ] + offset[ 1 ] ] :
    [ point[ 0 ] + offset, point[ 1 ] + offset[ 1 ] ]
  
const offsetPath = ( path, offset ) =>
  mapPath( path, offsetPoint, offset )
  
const offsetPaths = ( paths, offset ) =>
  mapPaths( paths, offsetPath, offset )

const floorPoint = point =>
  [ Math.floor( point[ 0 ] ), Math.floor( point[ 1 ] ) ]

const floorPath = path =>
  mapPath( path, floorPoint )

const floorPaths = paths =>
  mapPaths( paths, floorPath )
  
const scalePoint = ( point, scale ) =>
  Array.isArray( scale ) ?
    [ point[ 0 ] * scale[ 0 ], point[ 1 ] * scale[ 1 ] ] :
    [ point[ 0 ] * scale, point[ 1 ] * scale ]
  
const scalePath = ( path, scale ) =>
  mapPath( path, scalePoint, scale )
  
const scalePaths = ( paths, scale ) =>
  mapPaths( paths, scalePath, scale )

const stringPoint = point =>
  point[ 0 ] + ',' + point[ 1 ]

const stringPath = path =>
  path.map( stringPoint ).join( ' ' )

const stringPaths = paths =>
  paths.map( stringPath ).join( '\n' )
  
const svgPoint = point =>  
  `M ${ point[ 0 ] } ${ point[ 1 ] } l 0 0`
  
const svgPath = path =>  
  path.length === 1 ? 
    svgPoint( path[ 0 ] ):
    `M ${
      path.map( point =>
        point[ 0 ] + ' ' + point[ 1 ]
      ).join( ' L ' )
    }`  
    
const svgPaths = paths =>    
  paths.map( svgPath ).join( ' ' )
  
const leftPath = path =>
  path.reduce( ( left, point ) =>
    point[ 0 ] < left ? point[ 0 ] : left,
    Infinity 
  )

const rightPath = path =>
  path.reduce( ( right, point ) =>
    point[ 0 ] > right ? point[ 0 ] : right,
    -Infinity 
  )

const topPath = path =>
  path.reduce( ( top, point ) =>
    point[ 1 ] < top ? point[ 1 ] : top,
    Infinity 
  )

const bottomPath = path =>
  path.reduce( ( bottom, point ) =>
    point[ 1 ] > bottom ? point[ 1 ] : bottom,
    -Infinity 
  )
  
const leftPaths = paths =>
  paths.reduce( ( left, path ) => {
    const pathLeft = leftPath( path )
    return pathLeft < left ? pathLeft : left
  }, Infinity )

const rightPaths = paths =>
  paths.reduce( ( right, path ) => {
    const pathRight = rightPath( path )
    return pathRight > right ? pathRight : right
  }, -Infinity )

const topPaths = paths =>
  paths.reduce( ( top, path ) => {
    const pathTop = topPath( path )
    return pathTop < top ? pathTop : top
  }, Infinity )

const bottomPaths = paths =>
  paths.reduce( ( bottom, path ) => {
    const pathBottom = bottomPath( path )
    return pathBottom > bottom ? pathBottom : bottom
  }, -Infinity )
  
const widthPath = path =>
  rightPath( path ) - leftPath( path )

const heightPath = path =>
  bottomPath( path ) - topPath( path )
  
const widthPaths = paths =>
  rightPaths( paths ) - leftPaths( paths )

const heightPaths = paths =>
  bottomPaths( paths ) - topPaths( paths )

const fitPaths = ( p, width, height ) => {
  var paths = JSON.parse( JSON.stringify( p ) )
  
  const w = widthPaths( paths ) + leftPaths( paths )
  
  var scale = 1
  
  if( w > width ){
    scale = width / w
    paths = scalePaths( paths, scale )
  }
  
  const h = heightPaths( paths ) + topPaths( paths )
  
  if( h > height ){
    scale = height / h
    paths = scalePaths( paths, scale )
  } 

  return paths
}

const pathsListToPaths = pathsList =>       
  pathsList.reduce( ( paths, p ) => {
    return paths.concat( p )
  }, [] ) 
  
//statics

Point.isPoint = isPoint
Path.isPath = isPath
Paths.isPaths = isPaths

Paths.isPathsList = obj =>
  obj.every( Paths.isPaths )
  
module.exports = { Point, Path, Paths }