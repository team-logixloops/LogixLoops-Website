/**
 * The preloader's no-flash gate.
 *
 * Deliberately not a client module and deliberately not part of
 * `Preloader.jsx`: this string is rendered as an inline `<script>` by the root
 * layout, which is a Server Component. React 19 rejects script tags inside
 * client components — "Scripts inside React components are never executed when
 * rendering on the client" — and it is right to, because a client render is
 * exactly the case this script cannot serve. Its whole job happens during HTML
 * parse, ahead of hydration, which only the server path can offer it.
 *
 * What it does: on the loads that should not have a preloader — a refresh of a
 * deep page later in the session, an embedded copy inside a demo frame, a
 * visitor who asked for reduced motion — it hides the overlay before the
 * browser can paint it. React never writes this element's `style` attribute,
 * so the hide holds until the component's own layout effect unmounts the node.
 *
 * Writing that attribute before hydration is, however, exactly what React's
 * hydration check looks for, so the overlay carries `suppressHydrationWarning`.
 * See the note on the element in `Preloader.jsx`. If this script ever stops
 * touching `style`, that flag should come off with it.
 */

/** Per tab: a new tab is a new visit, a refresh is not. */
export const PRELOADER_SESSION_KEY = "ll-preloader-seen";

export const PRELOADER_ID = "ll-preloader";

export const PRELOADER_GATE_SCRIPT = `(function(){try{
var seen=sessionStorage.getItem('${PRELOADER_SESSION_KEY}');
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var framed=false;
try{framed=new URLSearchParams(location.search).get('embed')==='1'||window.self!==window.top;}catch(e){framed=true;}
if(reduce||framed||(seen&&location.pathname!=='/')){
var el=document.getElementById('${PRELOADER_ID}');
if(el){el.style.display='none';}
}}catch(e){}})();`;
