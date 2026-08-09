/**
 * FOX_OUTLINE, the LogixLoops fox silhouette as a closed polyline.
 *
 * Generated from the navy outline path of
 * `public/brand/logo-fox-knockout.svg`:
 * the path is flattened (cubics subdivided), the largest subpath taken as the
 * silhouette, then resampled to 72 points at equal arc length, centred on its
 * centroid and scaled so the furthest point sits at radius 1.
 *
 * Points, not the SVG path, because the consumer needs to walk the outline and
 * pull each vertex toward a nearby mesh node. Path2D can be stroked but not
 * sampled. Equal arc length matters for the same reason: it keeps the pull
 * evenly distributed instead of clustering it wherever the source curve
 * happened to have dense control points.
 *
 * Radii range 0.21–1.00; the low end is the notch under the tail, and it is
 * what makes the shape read as the mark rather than as a blob.
 *
 * Regenerate if the fox artwork changes, this is derived data.
 */
export const FOX_OUTLINE = [
  [0.031,0.856],[-0.019,0.790],[-0.056,0.714],[-0.128,0.672],[-0.196,0.621],
  [-0.254,0.557],[-0.299,0.485],[-0.334,0.406],[-0.364,0.327],
  [-0.402,0.251],[-0.479,0.233],[-0.551,0.281],[-0.621,0.331],
  [-0.701,0.359],[-0.785,0.350],[-0.863,0.317],[-0.888,0.250],
  [-0.841,0.179],[-0.795,0.106],[-0.778,0.028],[-0.780,-0.056],
  [-0.742,-0.133],[-0.717,-0.208],[-0.715,-0.294],[-0.691,-0.376],
  [-0.657,-0.441],[-0.602,-0.506],[-0.535,-0.559],[-0.475,-0.517],
  [-0.435,-0.519],[-0.375,-0.580],[-0.304,-0.627],[-0.262,-0.566],
  [-0.261,-0.480],[-0.260,-0.395],[-0.253,-0.309],[-0.222,-0.230],
  [-0.156,-0.179],[-0.077,-0.199],[-0.012,-0.254],[0.048,-0.316],
  [0.108,-0.378],[0.172,-0.436],[0.241,-0.487],[0.316,-0.529],
  [0.395,-0.558],[0.480,-0.573],[0.566,-0.574],[0.651,-0.561],
  [0.731,-0.533],[0.805,-0.489],[0.870,-0.433],[0.920,-0.364],
  [0.958,-0.287],[0.979,-0.204],[0.987,-0.118],[0.979,-0.033],[0.956,0.050],
  [0.918,0.127],[0.866,0.195],[0.803,0.253],[0.731,0.299],[0.654,0.336],
  [0.574,0.366],[0.497,0.399],[0.426,0.429],[0.351,0.471],[0.282,0.521],
  [0.219,0.579],[0.166,0.647],[0.120,0.719],[0.083,0.797]
];
