const assert = require( 'assert' )
const draw = require( '../hrm-draw' )

const Canvas = draw.Canvas

const countPoints = paths => 
  paths.reduce( ( count, path ) => {
    return count + path.length + 1
  }, 0 )

describe( 'hrm-draw canvas', () => {
  describe( 'ensure-valid', () => {
    it( 'trims too long paths', done => {
      const paths = []
      
      for( var i = 0; i < 20; i++ ){
        const path = []
        
        for( var j = 0; j < 20; j++ ){
          path.push( [ 1, 1 ] )
        } 
        
        paths.push( path )
      }
      
      const canvas = Canvas( paths )
      
      assert( countPoints( canvas.value() ) < 256 )
      
      done()
    })
  })
})