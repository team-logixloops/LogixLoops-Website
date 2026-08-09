/**
 * LOGIXLOOPS: Goo filter
 *
 * The SVG filter the blob buttons reference by id. A Gaussian blur, then a
 * colour matrix that drives alpha steeply back up and clips it, so two blurred
 * circles that overlap resolve into one shape with a meniscus between them
 * instead of two soft ovals. This is the whole trick; without it the four
 * blobs read as four blobs.
 *
 * Mounted once in the root layout rather than per button. `filter: url(#goo)`
 * is resolved against the document, so one definition serves every button on
 * the page, and duplicating it would mean duplicate ids.
 *
 * `stdDeviation` is tuned to button height rather than copied from the usual
 * demos, which assume a much larger element: at 10 the blur swallows a 48px
 * control and the fill arrives as a smear.
 *
 * Renders an empty 0×0 SVG. It has no visual output of its own and is hidden
 * from assistive technology.
 */
export default function GooFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      className="absolute"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="7" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" result="mix" />
        </filter>
      </defs>
    </svg>
  );
}
