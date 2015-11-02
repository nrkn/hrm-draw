const width = 65535
const height = 65535

const size = { width, height }

const vscale = 3
const stroke = 1920

const strokeOffset = stroke / 2

const wordSpacing = strokeOffset + stroke
const letterSpacing = strokeOffset + stroke

const viewBounds = {
  top: stroke + strokeOffset,
  bottom: height - stroke - strokeOffset,
  left: strokeOffset,
  right: width - strokeOffset
}

const viewSize = {
  width: viewBounds.right - viewBounds.left,
  height: viewBounds.bottom - viewBounds.top
}

const spacer = strokeOffset
const gridSpacing = stroke + strokeOffset

const maxPoints = 255

module.exports = {
  size,
  vscale,
  stroke,
  strokeOffset,
  wordSpacing,
  letterSpacing,
  viewBounds,
  viewSize,
  gridSpacing,
  maxPoints
}