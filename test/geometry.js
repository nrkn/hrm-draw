const assert = require( 'assert' )
const geometry = require( '../geometry' )

const Point = geometry.Point
const Path = geometry.Path
const Paths = geometry.Paths

describe( 'hrm-draw geometry', () => {
  describe( 'Point', () => {
    describe( 'factory', () => {
      it( 'from string', done => {
        const p = Point( '1,2' )
        
        assert.deepEqual( p.value(), [ 1, 2 ] )
        
        done()
      })
      
      it( 'from array', done => {
        const p = Point( [ 1, 2 ] )
        
        assert.deepEqual( p.value(), [ 1, 2 ] )
        
        done()        
      })
      
      it( 'from object', done => {
        const p = Point( { x: 1, y: 2 } )
        
        assert.deepEqual( p.value(), [ 1, 2 ] )
        
        done()        
      })
    })
    
    describe( 'API', () => {
      it( 'offset', done => {
        const p = Point( [ 1, 2 ] ).offset( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ 3, 5 ] )
        
        done()        
      })

      it( 'scale', done => {
        const p = Point( [ 1, 2 ] ).scale( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ 2, 6 ] )
        
        done()        
      })

      it( 'floor', done => {
        const p = Point( [ 1.5, 2.5 ] ).floor()

        assert.deepEqual( p.value(), [ 1, 2 ] )
        
        done()        
      })
    })
  })
  
  describe( 'Path', () => {
    describe( 'factory', () => {
      it( 'from string', done => {
        const p = Path( '1,2 2,3' )
        
        assert.deepEqual( p.value(), [ [ 1, 2 ], [ 2, 3 ] ] )
        
        done()
      })
      
      it( 'from array', done => {
        const p = Path( [ [ 1, 2 ], [ 2, 3 ] ] )
        
        assert.deepEqual( p.value(), [ [ 1, 2 ], [ 2, 3 ] ] )
        
        done()
      })
    })
    
    describe( 'API', () => {
      it( 'offset', done => {
        const p = Path( [ [ 1, 2 ], [ 2, 3 ] ] ).offset( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ [ 3, 5 ], [ 4, 6 ] ] )
        
        done()        
      })

      it( 'scale', done => {
        const p = Path( [ [ 1, 2 ], [ 2, 3 ] ] ).scale( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ [ 2, 6 ], [ 4, 9 ] ] )
        
        done()        
      })

      it( 'floor', done => {
        const p = Path( [ [ 1.5, 2.5 ], [ 2.7, 3.2 ] ] ).floor()

        assert.deepEqual( p.value(), [ [ 1, 2 ], [ 2, 3 ] ] )
        
        done()        
      })

      it( 'left', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 4 ] ] ).left()

        assert.equal( l, 1 )
        
        done()        
      })

      it( 'right', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 4 ] ] ).right()

        assert.equal( l, 2 )
        
        done()        
      })

      it( 'top', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 4 ] ] ).top()

        assert.equal( l, 3 )
        
        done()        
      })

      it( 'bottom', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 4 ] ] ).bottom()

        assert.equal( l, 4 )
        
        done()        
      })
      
      it( 'width', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 4 ] ] ).width()

        assert.equal( l, 1 )
        
        done()        
      })      
      
      it( 'height', done => {
        const l = Path( [ [ 2, 3 ], [ 1, 5 ] ] ).height()

        assert.equal( l, 2 )
        
        done()        
      })      
    })    
  })  
  
  describe( 'Paths', () => {
    describe( 'factory', () => {
      it( 'from string', done => {
        const p = Paths( '1,2 2,3\n3,4 4,5' )
        
        assert.deepEqual( p.value(), [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] )
        
        done()
      })
      
      it( 'from paths array', done => {
        const p = Paths( [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] )
        
        assert.deepEqual( p.value(), [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] )
        
        done()
      })
    })
    
    describe( 'API', () => {
      it( 'offset', done => {
        const p = Paths( [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] ).offset( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ [ [ 3, 5 ], [ 4, 6 ] ], [ [ 5, 7 ], [ 6, 8 ] ] ] )
        
        done()        
      })
      
      it( 'scale', done => {
        const p = Paths( [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] ).scale( [ 2, 3 ] )

        assert.deepEqual( p.value(), [ [ [ 2, 6 ], [ 4, 9 ] ], [ [ 6, 12 ], [ 8, 15 ] ] ] )
        
        done()        
      })

      
      it( 'floor', done => {
        const p = Paths( [ [ [ 1.5, 2 ], [ 2, 3.25 ] ], [ [ 3.7, 4 ], [ 4, 5.1 ] ] ] ).floor()

        assert.deepEqual( p.value(), [ [ [ 1, 2 ], [ 2, 3 ] ], [ [ 3, 4 ], [ 4, 5 ] ] ] )
        
        done()        
      })

      it( 'left', done => {
        const l = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).left()

        assert.equal( l, -3 )
        
        done()        
      })

      it( 'right', done => {
        const r = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).right()

        assert.equal( r, 4 )
        
        done()        
      })

      it( 'top', done => {
        const t = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).top()

        assert.equal( t, -1 )
        
        done()        
      })

      it( 'bottom', done => {
        const b = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).bottom()

        assert.equal( b, 5 )
        
        done()        
      })
      
      it( 'width', done => {
        const w = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).width()

        assert.equal( w, 7 )
        
        done()        
      })
      
      it( 'height', done => {
        const h = Paths( [ [ [ 1, -1 ], [ 2, 3 ] ], [ [ -3, 4 ], [ 4, 5 ] ] ] ).height()

        assert.equal( h, 6 )
        
        done()        
      })
      
      it( 'fit', done => {
        const fitted = Paths( [ [ [ 0, 0 ], [ 100, 100 ] ] ] ).fit( 50, 50 ).value()
        
        const p1 = fitted[ 0 ][ 0 ]
        const p2 = fitted[ 0 ][ 1 ]
        
        assert.deepEqual( p1, [ 0, 0 ] )
        assert.deepEqual( p2, [ 50, 50 ] )
        
        done()
      })
    })     
  })
})

