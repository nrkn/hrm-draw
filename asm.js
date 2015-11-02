const encode = require( 'hrm-image-encoder' )
const geometry = require( './geometry' )

const maxComments = 16

module.exports = paths => {
  const pathsList = geometry.Paths.isPathsList( paths ) ? paths : [ paths ]
  
  return pathsList.reduce( ( asm, paths, i ) =>
    i < maxComments ? 
      asm + `COMMENT ${ i }\nDEFINE COMMENT ${ i }\n${ encode( paths ) }` :
      asm, 
    '' 
  )
}