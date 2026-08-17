// dsh-client-ui-cat — a little tabby cat that wanders the DeepSeek Harness UI.
// Walks along the top edges of text/UI components, falls off cliff ends and
// gets hurt, recovers, and can be petted by clicking. Hand-built client bundle
// in the plugin-bundle format (window.__ModuleLoader__.load + { apply }).
// Self-contained: pure DOM + CSS, no requires, no network.
window.__ModuleLoader__.load({
	id: "dsh-client-ui-cat",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region dsh-cat
		const CAT_CSS = `
/* root: visual box 60x42 (the asset's own canvas) */
.dsh-cat {
  position: fixed;
  left: 0; top: 0;
  width: 60px; height: 42px;
  z-index: 2147483000;
  pointer-events: auto;
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  contain: layout style;
  will-change: transform;
}
.dsh-cat-flip {
  position: absolute; inset: 0;
  transform-origin: 50% 90%;
}
.dsh-cat--face-left .dsh-cat-flip { transform: scaleX(-1); }
.dsh-cat-inner {
  position: absolute; inset: 0;
  transform-origin: 50% 90%;
}
.dsh-cat-svg {
  display: block;
  overflow: visible;
}
/* tail: wag from the hip */
.wc-tail {
  transform-box: fill-box;
  transform-origin: 100% 100%;
  animation: dsh-cat-tailwag 2.8s ease-in-out infinite;
}
@keyframes dsh-cat-tailwag {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(-22deg); }
}
.dsh-cat--idle .wc-tail { animation: dsh-cat-tailwag-idle 3.6s ease-in-out infinite; }
@keyframes dsh-cat-tailwag-idle {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(0deg); }
}
.dsh-cat--petted .wc-tail { animation: dsh-cat-tailwag 0.7s ease-in-out infinite; }
.dsh-cat--drag .wc-tail { animation: dsh-cat-tailwag 0.4s ease-in-out infinite; }
.dsh-cat--hurt .wc-tail { animation: none; transform: rotate(-30deg); }
.dsh-cat--nap .wc-tail { animation: dsh-cat-tail-sleep 5s ease-in-out infinite; }
@keyframes dsh-cat-tail-sleep {
  0%, 100% { transform: rotate(28deg); }
  50% { transform: rotate(20deg); }
}
/* head */
.wc-head {
  transform-box: fill-box;
  transform-origin: 50% 95%;
}
.dsh-cat--walk .wc-head { animation: dsh-cat-headbob var(--dsh-step, 0.55s) ease-in-out infinite; }
@keyframes dsh-cat-headbob {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.dsh-cat--nap .wc-head { transform: rotate(44deg) translateY(3px); }
.dsh-cat--groom-scratch .wc-head { animation: dsh-cat-head-scratch 1.35s ease-in-out; }
@keyframes dsh-cat-head-scratch {
  0%, 100% { transform: rotate(0deg); }
  25%, 55% { transform: rotate(13deg); }
  40%, 70% { transform: rotate(8deg); }
}
.dsh-cat--groom-lick .wc-head { animation: dsh-cat-head-lick 1.35s ease-in-out; }
@keyframes dsh-cat-head-lick {
  0%, 100% { transform: rotate(0deg); }
  30% { transform: rotate(-8deg); }
  60% { transform: rotate(-4deg); }
}
/* idle/nap breathing */
.dsh-cat--idle .wc-body,
.dsh-cat--nap .wc-body {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  animation: dsh-cat-breathe 3.2s ease-in-out infinite;
}
.dsh-cat--nap .wc-body { animation-duration: 3.8s; }
@keyframes dsh-cat-breathe {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.035); }
}
/* cliff: standing at the edge, looking down */
.dsh-cat--cliff .dsh-cat-inner { transform: translateY(1px) rotate(2deg); }
.dsh-cat--cliff .wc-head { transform: rotate(10deg); }
.dsh-cat--cliff .wc-tail { animation: dsh-cat-tailwag 1.1s ease-in-out infinite; }
/* occasional ear twitch while resting */
.wc-ear {
  transform-box: fill-box;
  transform-origin: 50% 100%;
}
.dsh-cat--idle .wc-ear--r { animation: dsh-cat-ear-twitch 7s ease-in-out infinite; }
.dsh-cat--idle .wc-ear--l { animation: dsh-cat-ear-twitch 9s ease-in-out infinite; }
@keyframes dsh-cat-ear-twitch {
  0%, 95.5%, 100% { transform: rotate(0deg); }
  96.5% { transform: rotate(-12deg); }
  97.5% { transform: rotate(5deg); }
  98.5% { transform: rotate(-7deg); }
  99.5% { transform: rotate(0deg); }
}
/* legs */
.wc-leg {
  transform-box: fill-box;
  transform-origin: 50% 10%;
}
.dsh-cat--walk .wc-leg-fn,
.dsh-cat--walk .wc-leg-bf {
  animation: dsh-cat-legstep var(--dsh-step, 0.55s) ease-in-out infinite;
}
.dsh-cat--walk .wc-leg-ff,
.dsh-cat--walk .wc-leg-bn {
  animation: dsh-cat-legstep var(--dsh-step, 0.55s) ease-in-out infinite reverse;
}
@keyframes dsh-cat-legstep {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  30% { transform: rotate(15deg) translateY(-1.5px); }
  55% { transform: rotate(0deg) translateY(0.5px); }
  80% { transform: rotate(-15deg) translateY(-1px); }
}
.dsh-cat--idle .wc-leg { transform: scaleY(0.78) translateY(3px); }
.dsh-cat--nap .wc-leg { transform: scaleY(0.45) translateY(7px); }
.dsh-cat--hurt .wc-leg { transform: scaleY(0.7) translateY(2px); }
.dsh-cat--drag .wc-leg { transform-origin: 50% 10%; }
.dsh-cat--drag .wc-leg-fn,
.dsh-cat--drag .wc-leg-bf { animation: dsh-cat-drag-kick 0.26s ease-in-out infinite; }
.dsh-cat--drag .wc-leg-ff,
.dsh-cat--drag .wc-leg-bn { animation: dsh-cat-drag-kick 0.26s ease-in-out infinite reverse; }
@keyframes dsh-cat-drag-kick {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  50% { transform: rotate(30deg) translateY(5px); }
}
.dsh-cat--groom-scratch .wc-leg-bn { animation: dsh-cat-leg-scratch 1.35s ease-in-out; }
@keyframes dsh-cat-leg-scratch {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-7px) rotate(-34deg); }
  40% { transform: translateY(-5px) rotate(-24deg); }
  55% { transform: translateY(-7px) rotate(-34deg); }
  70% { transform: translateY(-5px) rotate(-27deg); }
}
.dsh-cat--groom-lick .wc-leg-fn { animation: dsh-cat-leg-lick 1.35s ease-in-out; }
@keyframes dsh-cat-leg-lick {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  30% { transform: translateY(-6px) rotate(24deg); }
  60% { transform: translateY(-3px) rotate(12deg); }
}
.dsh-cat--recover .wc-leg-fn { animation: dsh-cat-brush-paw 1.55s ease-in-out; }
@keyframes dsh-cat-brush-paw {
  0%, 56% { transform: translateY(0) rotate(0deg); }
  64% { transform: translateY(-7px) rotate(-18deg); }
  74% { transform: translateY(0) rotate(0deg); }
  86% { transform: translateY(-5px) rotate(-14deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
/* body-level motion */
.dsh-cat--walk .dsh-cat-inner { animation: dsh-cat-bounce var(--dsh-step, 0.55s) ease-in-out infinite; }
@keyframes dsh-cat-bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(1.5deg); }
}
.dsh-cat--hop .dsh-cat-inner { animation: dsh-cat-hop 0.5s ease-in-out; }
@keyframes dsh-cat-hop {
  0% { transform: translateY(0) scaleY(0.92); }
  35% { transform: translateY(-4px) scaleY(1.06) scaleX(0.96); }
  70% { transform: translateY(2px) scaleY(0.94); }
  100% { transform: translateY(0) scaleY(1); }
}
.dsh-cat--fall .dsh-cat-inner { animation: dsh-cat-fallspin var(--dsh-fall-dur, 0.5s) ease-in forwards; }
@keyframes dsh-cat-fallspin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(200deg); }
}
.dsh-cat--hurt .dsh-cat-inner { animation: dsh-cat-hurt-land 0.4s ease-out forwards; }
@keyframes dsh-cat-hurt-land {
  0% { transform: translateY(-10px) scaleY(0.85) rotate(0deg); }
  30% { transform: translateY(0) scaleY(1.12) rotate(5deg); }
  60% { transform: translateY(4px) scaleY(0.95) rotate(12deg); }
  100% { transform: translateY(3px) scaleY(1) rotate(14deg); }
}
.dsh-cat--hurt .wc-leg-fn { transform: scaleY(0.7) rotate(14deg) translateY(2px); }
.dsh-cat--hurt .wc-leg-bn { transform: scaleY(0.7) rotate(-14deg) translateY(2px); }
.dsh-cat--recover .dsh-cat-inner { animation: dsh-cat-recover 1.55s ease-in-out; }
@keyframes dsh-cat-recover {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  10% { transform: translateY(-2px) rotate(-9deg); }
  22% { transform: rotate(9deg); }
  34% { transform: translateY(-1px) rotate(-6deg); }
  46% { transform: rotate(6deg); }
  56% { transform: translateY(0) rotate(0deg); }
  64% { transform: translateY(-3px) rotate(-4deg) scaleY(1.05); }
  74% { transform: translateY(1px) rotate(3deg); }
  86% { transform: translateY(-2px) rotate(-3deg) scaleY(1.04); }
  100% { transform: translateY(0) rotate(0deg); }
}
.dsh-cat--petted .dsh-cat-inner { animation: dsh-cat-pet-rise 1.1s ease-in-out; }
@keyframes dsh-cat-pet-rise {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-7px) rotate(-8deg); }
  55% { transform: translateY(-2px) rotate(5deg); }
  80% { transform: translateY(-4px) rotate(-3deg); }
}
.dsh-cat--idle .dsh-cat-inner { transform: translateY(4px); }
.dsh-cat--nap .dsh-cat-inner { transform: translateY(9px) rotate(2deg); }
.dsh-cat--drag .dsh-cat-inner { animation: dsh-cat-drag-dangle 0.3s ease-in-out infinite alternate; }
@keyframes dsh-cat-drag-dangle {
  0% { transform: translateY(0) rotate(-6deg); }
  100% { transform: translateY(3px) rotate(6deg); }
}
.dsh-cat--groom-scratch .dsh-cat-inner { animation: dsh-cat-groom-scratch 1.35s ease-in-out; }
@keyframes dsh-cat-groom-scratch {
  0%, 100% { transform: translateY(4px) rotate(0deg); }
  20% { transform: translateY(2px) rotate(-8deg); }
  50% { transform: translateY(5px) rotate(4deg); }
  80% { transform: translateY(2px) rotate(-6deg); }
}
.dsh-cat--groom-lick .dsh-cat-inner { animation: dsh-cat-groom-lick 1.35s ease-in-out; }
@keyframes dsh-cat-groom-lick {
  0%, 100% { transform: translateY(4px) rotate(0deg); }
  30% { transform: translateY(1px) rotate(6deg); }
  60% { transform: translateY(5px) rotate(-3deg); }
}
/* eyes: three states, switched by CSS */
.wc-eye-closed,
.wc-eye-hurt { display: none; }
.wc-eye {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  animation: dsh-cat-blink 4.8s infinite;
}
@keyframes dsh-cat-blink {
  0%, 90%, 100% { transform: scaleY(1); }
  94% { transform: scaleY(0.12); }
}
.dsh-cat--idle .wc-eye,
.dsh-cat--petted .wc-eye,
.dsh-cat--groom .wc-eye,
.dsh-cat--nap .wc-eye { display: none; animation: none; }
.dsh-cat--idle .wc-eye-closed,
.dsh-cat--petted .wc-eye-closed,
.dsh-cat--groom .wc-eye-closed,
.dsh-cat--nap .wc-eye-closed { display: block; }
.dsh-cat--hurt .wc-eye { display: none; animation: none; }
.dsh-cat--hurt .wc-eye-hurt { display: block; }
.dsh-cat--drag .wc-eye { animation: none; }
/* speed lines while running */
.dsh-cat-lines { opacity: 0; }
.dsh-cat-lines rect {
  transform-box: fill-box;
  transform-origin: 100% 50%;
  animation: dsh-cat-line-dash 0.4s linear infinite;
}
.dsh-cat-lines rect:nth-child(2) { animation-delay: 0.13s; }
.dsh-cat-lines rect:nth-child(3) { animation-delay: 0.26s; }
.dsh-cat--run .dsh-cat-lines { opacity: 1; }
@keyframes dsh-cat-line-dash {
  0% { transform: translateX(0) scaleX(1); opacity: 0.7; }
  100% { transform: translateX(18px) scaleX(0.6); opacity: 0; }
}
/* running: fast gallop, low stretched body, forward head */
.dsh-cat--run .dsh-cat-inner { animation: dsh-cat-run-bounce var(--dsh-step, 0.2s) ease-in-out infinite; }
@keyframes dsh-cat-run-bounce {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-3.5px) rotate(2deg); }
}
.dsh-cat--run .wc-leg-fn,
.dsh-cat--run .wc-leg-bf { animation: dsh-cat-runstep var(--dsh-step, 0.2s) ease-in-out infinite; }
.dsh-cat--run .wc-leg-ff,
.dsh-cat--run .wc-leg-bn { animation: dsh-cat-runstep var(--dsh-step, 0.2s) ease-in-out infinite reverse; }
@keyframes dsh-cat-runstep {
  0%, 100% { transform: rotate(0deg) translateY(0); }
  25% { transform: rotate(22deg) translateY(-2px); }
  50% { transform: rotate(0deg) translateY(1px); }
  75% { transform: rotate(-22deg) translateY(-2px); }
}
.dsh-cat--run .wc-body {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transform: scaleX(1.08) scaleY(0.9);
}
.dsh-cat--run .wc-head { transform: rotate(7deg); }
.dsh-cat--run .wc-tail { animation: dsh-cat-tailwag 0.3s ease-in-out infinite; }
/* leaping: airborne, legs splayed, head up */
.dsh-cat--jump .dsh-cat-inner { transform: rotate(-8deg); }
.dsh-cat--jump .wc-leg-fn { transform: rotate(24deg) translateY(2px); }
.dsh-cat--jump .wc-leg-bn { transform: rotate(-20deg) translateY(1px); }
.dsh-cat--jump .wc-leg-ff { transform: rotate(12deg) translateY(1px); }
.dsh-cat--jump .wc-leg-bf { transform: rotate(-12deg) translateY(1px); }
.dsh-cat--jump .wc-head { transform: rotate(10deg); }
.dsh-cat--jump .wc-tail { animation: dsh-cat-tailwag 0.25s ease-in-out infinite; }
/* sniffing the ground mid-walk */
.dsh-cat--sniff .dsh-cat-inner { transform: translateY(1px) rotate(2deg); }
.dsh-cat--sniff .wc-head { animation: dsh-cat-sniff 1.05s ease-in-out; }
@keyframes dsh-cat-sniff {
  0%, 100% { transform: rotate(0deg); }
  22% { transform: rotate(28deg) translateY(1px); }
  38% { transform: rotate(22deg) translateY(0.5px); }
  55% { transform: rotate(30deg) translateY(1.5px); }
  70% { transform: rotate(23deg) translateY(0.5px); }
  86% { transform: rotate(27deg) translateY(1.5px); }
}
/* whole-page shake when the cat lands */
.dsh-cat-shake {
  animation: dsh-cat-screen-shake 0.35s ease-out;
}
@keyframes dsh-cat-screen-shake {
  0% { transform: translate(0, 0); }
  15% { transform: translate(-4px, 2px); }
  30% { transform: translate(4px, -2px); }
  45% { transform: translate(-3px, 1px); }
  60% { transform: translate(3px, -1px); }
  80% { transform: translate(-2px, 1px); }
  100% { transform: translate(0, 0); }
}
/* bump overlay (visual space) */
.dsh-cat-bump {
  position: absolute; left: 44px; top: -10px;
  width: 12px; height: 10px;
  border-radius: 50% 50% 60% 60%;
  background: linear-gradient(180deg, #ff9aa6, #f0657a);
  opacity: 0;
  pointer-events: none;
}
.dsh-cat--hurt .dsh-cat-bump {
  opacity: 1;
  animation: dsh-cat-bump-pulse 0.45s ease-in-out infinite alternate;
}
@keyframes dsh-cat-bump-pulse {
  from { transform: scale(1); }
  to { transform: scale(1.12); }
}
/* bubble */
.dsh-cat-bubble {
  position: absolute; top: -28px; right: -6px;
  padding: 4px 9px;
  background: #fff;
  border: 1px solid #f5d9a8;
  border-radius: 13px;
  font: 600 13px/1.4 -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #9c6b2f;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.14);
  opacity: 0;
  transform: translateY(4px) scale(0.8);
  transition: opacity 0.25s ease, transform 0.25s ease;
  white-space: nowrap;
  pointer-events: none;
  z-index: 5;
}
.dsh-cat-bubble::after {
  content: "";
  position: absolute; right: 16px; bottom: -6px;
  width: 9px; height: 9px;
  background: #fff;
  border-right: 1px solid #f5d9a8;
  border-bottom: 1px solid #f5d9a8;
  transform: rotate(45deg);
}
.dsh-cat-bubble--show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
/* "!" shock mark */
.dsh-cat-fx {
  position: absolute; left: 22px; top: -34px;
  width: 16px; height: 16px;
  border-radius: 50%;
  background: #ff6b6b;
  color: #fff;
  font: 800 12px/16px -apple-system, "PingFang SC", sans-serif;
  text-align: center;
  opacity: 0;
  pointer-events: none;
}
.dsh-cat-fx--show { animation: dsh-cat-fx-pop 0.6s ease-out forwards; }
@keyframes dsh-cat-fx-pop {
  0% { opacity: 0; transform: scale(0.4); }
  30% { opacity: 1; transform: scale(1.15); }
  100% { opacity: 0; transform: scale(1) translateY(-10px); }
}
/* dizzy stars */
.dsh-cat-star {
  position: absolute; left: 40px; top: -14px;
  width: 13px; height: 13px;
  background: #ffd23f;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  opacity: 0;
  pointer-events: none;
}
.dsh-cat--hurt .dsh-cat-star { opacity: 1; animation: dsh-cat-star-orbit 1.15s linear infinite; }
.dsh-cat-star--2 { animation-delay: 0.38s !important; }
.dsh-cat-star--3 { animation-delay: 0.76s !important; }
/* keep the dizzy stars above the head when the cat faces left */
.dsh-cat--face-left .dsh-cat-star { left: 7px; }
@keyframes dsh-cat-star-orbit {
  0% { transform: translate(0, 0) rotate(0deg) scale(0.8); }
  25% { transform: translate(16px, -11px) rotate(90deg) scale(1); }
  50% { transform: translate(0, -22px) rotate(180deg) scale(0.85); }
  75% { transform: translate(-16px, -11px) rotate(270deg) scale(1); }
  100% { transform: translate(0, 0) rotate(360deg) scale(0.8); }
}
/* hearts when petted */
.dsh-cat-heart {
  position: absolute; top: -8px; left: 38px;
  width: 10px; height: 10px;
  background: #ff5d7e;
  border-radius: 2px;
  transform: rotate(45deg);
  opacity: 0;
  pointer-events: none;
}
.dsh-cat-heart::before,
.dsh-cat-heart::after {
  content: "";
  position: absolute;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: inherit;
}
.dsh-cat-heart::before { left: -5px; top: 0; }
.dsh-cat-heart::after { top: -5px; left: 0; }
.dsh-cat-heart--2 { left: 48px; }
.dsh-cat--petted .dsh-cat-heart { animation: dsh-cat-heart-rise 1.15s ease-out forwards; }
.dsh-cat--petted .dsh-cat-heart--2 { animation-delay: 0.16s; }
@keyframes dsh-cat-heart-rise {
  0% { opacity: 0; transform: rotate(45deg) translateY(8px) scale(0.5); }
  25% { opacity: 1; }
  100% { opacity: 0; transform: rotate(45deg) translateY(-26px) scale(1.15); }
}
/* landing dust */
.dsh-cat-dust {
  position: absolute; left: 12px; top: 22px;
  width: 38px; height: 16px;
  pointer-events: none;
  opacity: 0;
}
.dsh-cat-dust i {
  position: absolute; bottom: 0;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(214, 180, 130, 0.55) 60%, transparent 78%);
}
.dsh-cat-dust i:nth-child(1) { left: 0px; width: 10px; height: 10px; }
.dsh-cat-dust i:nth-child(2) { left: 14px; width: 14px; height: 14px; }
.dsh-cat-dust i:nth-child(3) { left: 28px; width: 10px; height: 10px; }
.dsh-cat-dust--puff { animation: dsh-cat-dust-fade 0.65s ease-out forwards; }
@keyframes dsh-cat-dust-fade {
  0% { opacity: 1; }
  100% { opacity: 0; }
}
.dsh-cat-dust--puff i:nth-child(1) { animation: dsh-cat-dust-p1 0.65s ease-out forwards; }
.dsh-cat-dust--puff i:nth-child(2) { animation: dsh-cat-dust-p2 0.65s ease-out forwards; }
.dsh-cat-dust--puff i:nth-child(3) { animation: dsh-cat-dust-p3 0.65s ease-out forwards; }
@keyframes dsh-cat-dust-p1 {
  0% { transform: translate(0, 0) scale(0.5); opacity: 0.95; }
  100% { transform: translate(-8px, -14px) scale(1.5); opacity: 0; }
}
@keyframes dsh-cat-dust-p2 {
  0% { transform: translate(0, 0) scale(0.5); opacity: 0.95; }
  100% { transform: translate(1px, -18px) scale(1.7); opacity: 0; }
}
@keyframes dsh-cat-dust-p3 {
  0% { transform: translate(0, 0) scale(0.5); opacity: 0.95; }
  100% { transform: translate(9px, -13px) scale(1.5); opacity: 0; }
}
/* Zzz while napping */
.dsh-cat-zzz {
  position: absolute; left: 28px; top: -22px;
  font: 800 11px/1 -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
  color: #a98a5f;
  opacity: 0;
  pointer-events: none;
}
.dsh-cat-zzz--2 { left: 38px; font-size: 13px; }
.dsh-cat-zzz--3 { left: 46px; font-size: 15px; }
.dsh-cat--nap .dsh-cat-zzz { animation: dsh-cat-zzz-float 2.2s ease-out infinite; }
.dsh-cat--nap .dsh-cat-zzz--2 { animation-delay: 0.6s; }
.dsh-cat--nap .dsh-cat-zzz--3 { animation-delay: 1.2s; }
@keyframes dsh-cat-zzz-float {
  0% { opacity: 0; transform: translateY(8px) scale(0.6); }
  25% { opacity: 0.9; }
  100% { opacity: 0; transform: translateY(-26px) scale(1.15); }
}
/* teleport: vanish in a puff, reappear elsewhere */
.dsh-cat--teleport .dsh-cat-inner { animation: dsh-cat-teleport-out 0.32s ease-in forwards; }
.dsh-cat--teleport-arrive .dsh-cat-inner { animation: dsh-cat-teleport-in 0.36s ease-out backwards; }
@keyframes dsh-cat-teleport-out {
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  100% { transform: scale(0.15) rotate(200deg); opacity: 0; }
}
@keyframes dsh-cat-teleport-in {
  0% { transform: scale(0.15) rotate(-200deg); opacity: 0; }
  60% { transform: scale(1.12) rotate(10deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
/* backing up before turning around: legs walk in reverse */
.dsh-cat--backing .wc-leg-fn,
.dsh-cat--backing .wc-leg-bf { animation-direction: reverse; }
.dsh-cat--backing .wc-leg-ff,
.dsh-cat--backing .wc-leg-bn { animation-direction: normal; }
.dsh-cat--backing .dsh-cat-inner { transform: translateX(-2px); }
/* teleport smoke puffs: bright swirling particles */
.dsh-cat-poof {
  position: fixed;
  width: 0; height: 0;
  z-index: 2147483001;
  pointer-events: none;
}
.dsh-cat-poof i {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,205,125,0.7) 55%, transparent 78%);
  animation: dsh-cat-poof-p 0.85s ease-out forwards;
}
@keyframes dsh-cat-poof-p {
  0% { transform: translate(0,0) scale(0.3) rotate(0deg); opacity: 1; }
  100% { transform: translate(var(--dx), var(--dy)) scale(1.9) rotate(var(--rot)); opacity: 0; }
}
/* cat poop: stays until clicked or page refresh */
.dsh-cat-poop {
  position: fixed;
  width: 13px; height: 11px;
  z-index: 2147483000;
  pointer-events: auto;
  cursor: pointer;
  opacity: 0;
}
.dsh-cat-poop svg {
  display: block;
  overflow: visible;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.12));
}
.dsh-cat-poop--show { animation: dsh-cat-poop-drop 0.8s ease-out forwards; }
@keyframes dsh-cat-poop-drop {
  0% { opacity: 0; transform: translateY(-10px) scale(0.3) rotate(-12deg); }
  40% { opacity: 1; transform: translateY(1px) scale(1.12) rotate(5deg); }
  75% { transform: translateY(2px) scale(0.98) rotate(-2deg); }
  100% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
}
.dsh-cat-poop--squish { animation: dsh-cat-poop-squish 0.3s ease-in forwards; }
@keyframes dsh-cat-poop-squish {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.2) rotate(30deg); }
}
/* after pooping: proud tail flicks, then sniff the result */
.dsh-cat--poop-done .dsh-cat-inner { transform: translateY(1px); }
.dsh-cat--poop-done .wc-tail { animation: dsh-cat-tail-flick 0.42s ease-in-out infinite; }
@keyframes dsh-cat-tail-flick {
  0%, 100% { transform: rotate(-8deg); }
  50% { transform: rotate(-52deg); }
}
.dsh-cat--poop-done .wc-head { animation: dsh-cat-sniff 1.1s ease-in-out; }
`;
		// Visual cat size (the asset's 60x42 canvas).
		const CAT_W = 60;
		const CAT_H = 42;
		const MARGIN = 6;
		const MIN_LEDGE = 90; // shortest walkable top-edge (px)
		const HOP_MAX = 90;   // highest ledge the cat can hop onto (px)
		const FALL_G = 800;   // px/s^2 fall gravity
		const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);
		const rand = (lo, hi) => lo + Math.random() * (hi - lo);

														// Walking-cat skins (assets/cats). Right-click the cat to cycle.
			const SKINS = [
				{ name: "橘猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#f09340\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"transparent\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#f09340\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#f09340\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#f09340\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#ffe0bb\"/> <g fill=\"#d2691e\" opacity=\"0.45\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#f09340\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#f09340\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#f09340\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#f09340\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#f4a98c\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#f4a98c\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#f09340\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"transparent\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#ffe0bb\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#7bc96f\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#d97b5f\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#f09340\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#ffe0bb\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
				{ name: "白猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#f2f3f5\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"transparent\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#f2f3f5\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#f2f3f5\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#f2f3f5\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#ffffff\"/> <g fill=\"#000\" opacity=\"0\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#f2f3f5\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#f2f3f5\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#f2f3f5\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#f2f3f5\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#f6b9c6\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#f6b9c6\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#f2f3f5\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"transparent\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#ffffff\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#5fb9e6\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#f29bb0\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#f2f3f5\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#ffffff\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
				{ name: "奶牛猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#2c2c34\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"transparent\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#2c2c34\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#2c2c34\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#2c2c34\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#f6f6f8\"/> <g fill=\"#000\" opacity=\"0\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#2c2c34\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#2c2c34\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#2c2c34\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#2c2c34\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#e79bb0\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#e79bb0\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#2c2c34\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"transparent\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#f6f6f8\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#9be36a\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#e58aa6\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#2c2c34\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#f6f6f8\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
				{ name: "黑猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#33333b\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"transparent\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#33333b\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#33333b\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#33333b\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#43434d\"/> <g fill=\"#000\" opacity=\"0\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#33333b\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#33333b\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#33333b\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#33333b\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#caa0ad\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#caa0ad\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#33333b\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"transparent\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#43434d\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#ffce4d\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#caa0ad\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#33333b\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#43434d\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
				{ name: "灰猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#9aa3ad\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"transparent\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#9aa3ad\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#9aa3ad\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"transparent\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#9aa3ad\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#d3d9df\"/> <g fill=\"#6b7682\" opacity=\"0.5\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#9aa3ad\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#9aa3ad\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"transparent\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#9aa3ad\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#9aa3ad\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#e3a9b3\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#e3a9b3\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"transparent\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#9aa3ad\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"transparent\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#d3d9df\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#ffce4d\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#9b8088\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#9aa3ad\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#d3d9df\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
				{ name: "暹罗猫", markup: "<g class=\"wc-tail\"> <path d=\"M15,27 C5,26 3,15 9,9\" fill=\"none\" stroke=\"#ece0cd\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> <path d=\"M9.4,9.6 a3.2,3.2 0 0 1 -.8,-.6\" fill=\"none\" stroke=\"#4a3a32\" stroke-width=\"6.5\" stroke-linecap=\"round\"/> </g> <g class=\"wc-leg wc-leg-ff\"><rect x=\"39\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#ece0cd\" opacity=\".82\"/><rect x=\"39\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"#4a3a32\"/></g> <g class=\"wc-leg wc-leg-bf\"><rect x=\"19\" y=\"27\" width=\"5\" height=\"13\" rx=\"2.5\" fill=\"#ece0cd\" opacity=\".82\"/><rect x=\"19\" y=\"36.5\" width=\"5\" height=\"3.5\" rx=\"1.6\" fill=\"#4a3a32\"/></g> <g class=\"wc-body\"> <ellipse cx=\"29\" cy=\"23\" rx=\"18\" ry=\"11\" fill=\"#ece0cd\"/> <ellipse cx=\"27\" cy=\"29\" rx=\"13\" ry=\"6\" fill=\"#f6efe2\"/> <g fill=\"#000\" opacity=\"0\"> <rect x=\"22\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> <rect x=\"28\" y=\"12.5\" width=\"2.4\" height=\"10\" rx=\"1.2\"/> <rect x=\"34\" y=\"13\" width=\"2.4\" height=\"9\" rx=\"1.2\"/> </g> </g> <g class=\"wc-leg wc-leg-fn\"><rect x=\"41.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#ece0cd\"/><rect x=\"41.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"#4a3a32\"/></g> <g class=\"wc-leg wc-leg-bn\"><rect x=\"21.5\" y=\"27\" width=\"5.6\" height=\"13.5\" rx=\"2.8\" fill=\"#ece0cd\"/><rect x=\"21.5\" y=\"37\" width=\"5.6\" height=\"3.5\" rx=\"1.7\" fill=\"#4a3a32\"/></g> <g class=\"wc-head\"> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#ece0cd\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#ece0cd\"/> <path d=\"M41.6,10.5 L42.6,5.2 L46,8.6 Z\" fill=\"#4a3a32\"/> <path d=\"M52.9,10.5 L51.9,5.2 L48.6,8.6 Z\" fill=\"#4a3a32\"/> <path d=\"M40,12 L41.5,2.5 L48,8.5 Z\" fill=\"#4a3a32\" opacity=\".55\"/> <path d=\"M54.5,12 L53,2.5 L47,8.5 Z\" fill=\"#4a3a32\" opacity=\".55\"/> <circle cx=\"47\" cy=\"17\" r=\"10\" fill=\"#ece0cd\"/> <ellipse cx=\"53\" cy=\"19\" rx=\"6\" ry=\"6.5\" fill=\"#4a3a32\" opacity=\".35\"/> <ellipse cx=\"53.5\" cy=\"20.5\" rx=\"4.6\" ry=\"4\" fill=\"#f6efe2\"/> <g class=\"wc-eye\"><ellipse cx=\"50\" cy=\"16.5\" rx=\"2.1\" ry=\"2.7\" fill=\"#4fb0e6\"/><ellipse cx=\"50.4\" cy=\"17.4\" rx=\".8\" ry=\"1.6\" fill=\"#1a1a22\"/><circle cx=\"49.3\" cy=\"15.4\" r=\".7\" fill=\"#fff\" opacity=\".9\"/></g> <path d=\"M56.4,18.6 l2.4,0 l-1.2,1.7 Z\" fill=\"#b08274\"/> <path d=\"M57.6,20.3 q0,1.6 -1.6,1.8\" fill=\"none\" stroke=\"#ece0cd\" stroke-width=\".8\" opacity=\".5\"/> <g stroke=\"#f6efe2\" stroke-width=\".7\" opacity=\".75\" stroke-linecap=\"round\"> <line x1=\"55\" y1=\"19.5\" x2=\"60\" y2=\"18.5\"/> <line x1=\"55\" y1=\"20.6\" x2=\"60\" y2=\"21\"/> </g> </g><g class=\"wc-eye-closed\"><path d=\"M 47 18 q 3 -3.6 6 0\" stroke=\"#7a4a24\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g class=\"wc-eye-hurt\"><g stroke=\"#2a2a32\" stroke-width=\"2\" stroke-linecap=\"round\"><path d=\"M 47.6 14.6 L 52.4 19.4 M 52.4 14.6 L 47.6 19.4\"/></g></g>" },
			];
			const SKIN_LINES =
				'<g class="dsh-cat-lines"><rect x="-26" y="12" width="14" height="2.5" rx="1.25" fill="rgba(130,85,30,0.45)"/><rect x="-32" y="17" width="20" height="2.5" rx="1.25" fill="rgba(130,85,30,0.45)"/><rect x="-24" y="22" width="10" height="2.5" rx="1.25" fill="rgba(130,85,30,0.45)"/></g>';
			const renderSkin = (i) => SKIN_LINES + SKINS[i].markup;
			function apply(ctx) {
			if (typeof document === "undefined" || !document.body) return;
			const style = document.createElement("style");
			style.dataset.plugin = "dsh-client-ui-cat";
			style.dataset.pluginCss = "dsh-client-ui-cat";
			style.textContent = CAT_CSS;
			document.head.appendChild(style);
			const root = document.createElement("div");
			root.className = "dsh-cat";
			root.setAttribute("aria-hidden", "true");

			// Restore the last chosen skin (persisted in localStorage).
			let skinIndex = 0;
			try {
				const saved = parseInt(localStorage.getItem("dsh-cat-skin"), 10);
				if (Number.isFinite(saved) && saved >= 0 && saved < SKINS.length) skinIndex = saved;
			} catch (err) {
				/* storage unavailable — fall back to skin 0 */
			}
																																							root.innerHTML =
				'<div class="dsh-cat-flip"><div class="dsh-cat-inner">' +
				'<svg class="dsh-cat-svg" viewBox="0 0 60 42" width="60" height="42" focusable="false">' +
				renderSkin(skinIndex) +
				"</svg>" +
				"</div></div>" +
				'<div class="dsh-cat-bubble"></div>' +
				'<div class="dsh-cat-fx">!</div>' +
				'<div class="dsh-cat-bump"></div>' +
				'<div class="dsh-cat-heart dsh-cat-heart--1"></div>' +
				'<div class="dsh-cat-heart dsh-cat-heart--2"></div>' +
				'<div class="dsh-cat-star dsh-cat-star--1"></div>' +
				'<div class="dsh-cat-star dsh-cat-star--2"></div>' +
				'<div class="dsh-cat-star dsh-cat-star--3"></div>' +
				'<div class="dsh-cat-dust"><i></i><i></i><i></i></div>' +
				'<div class="dsh-cat-zzz dsh-cat-zzz--1">z</div>' +
				'<div class="dsh-cat-zzz dsh-cat-zzz--2">z</div>' +
				'<div class="dsh-cat-zzz dsh-cat-zzz--3">z</div>';
			document.body.appendChild(root);

			const bubble = root.querySelector(".dsh-cat-bubble");
			const fx = root.querySelector(".dsh-cat-fx");
			const dust = root.querySelector(".dsh-cat-dust");
			const svgEl = root.querySelector(".dsh-cat-svg");
			const reduced =
				typeof window.matchMedia === "function" &&
				window.matchMedia("(prefers-reduced-motion: reduce)").matches;

			let x = 60;
			let y = 70;
			let tx = 60;
			let ty = 70;
			let speed = 70;
			let state = "idle"; // idle | edge | ground | hop | cliff | fall | hurt | recover | nap | pet | teleport | poop
			let ledge = null;   // current ledge {y, x1, x2}
			let onLedge = false;
			let edges = [];     // [{y, x1, x2}]
			let restUntil = performance.now() + 600;
			let cliffUntil = 0;
			let fallX = 0;
			let fallY0 = 0;
			let fallVy = 0;
			let fallDist = 0;
			let hopFrom = 0;
			let hopTo = 0;
			let hopT0 = 0;
			let last = performance.now();
			let raf = 0;
			let lastScan = 0;
			let lastScrollScan = 0;
			let bubbleTimer = 0;
			let petTimer = 0;
			let hurtTimer = 0;
			let napTimer = 0;
			let mustMove = false;
			let prevState = "idle";
			let turnTarget = null;
			let sniffTimer = 0;
			let sniffReturn = "ground";
			let jumpX0 = 0;
			let jumpY0 = 0;
			let jumpX1 = 0;
			let jumpY1 = 0;
			let jumpArc = 20;
			let jumpDur = 0.5;
			let jumpT0 = 0;
			let jumpKind = "run";
			let jumpLedge = null;
			let grooming = false;
			let groomTimer = 0;
			let teleportTimer = 0;
			let backing = false;    // backing up a few steps before turning around
			let backX1 = 0;
			let poopTimer = 0;
			let poopCooldownUntil = 0; // don't poop again too soon
			let lastTeleportCheck = performance.now() + rand(12000, 22000);
			let lastPoopCheck = performance.now() + rand(15000, 30000);
			let idleSince = 0;
			let dragging = false;
			let dragMoved = false;
			let pointerId = null;
			let dragOffX = 0;
			let dragOffY = 0;
			let pressX = 0;
			let pressY = 0;

			const vw = () => window.innerWidth;
			const vh = () => window.innerHeight;

			// ── edge discovery ──────────────────────────────────────────────
			function scanEdges() {
				lastScan = performance.now();
				const rects = [];
				const els = document.querySelectorAll(
					"p,h1,h2,h3,h4,h5,li,blockquote,pre,code,article,section,aside,main,header,footer,nav,button,textarea,select,label,form,ol,ul,table,div,span"
				);
				for (const el of els) {
					if (el.closest(".dsh-cat")) continue;
					const r = el.getBoundingClientRect();
					if (r.width < 60 || r.height < 12) continue;
					if (r.bottom <= 0 || r.top >= vh() || r.right <= 0 || r.left >= vw()) continue;
					if (r.top < CAT_H + 6 || r.top > vh() - 46) continue;
					if (!el.innerText || el.innerText.trim().length === 0) continue;
					rects.push({ y: r.top, x1: r.left, x2: r.right });
				}
				rects.sort((a, b) => a.y - b.y || a.x1 - b.x1);
				const merged = [];
				for (const r of rects) {
					const prev = merged[merged.length - 1];
					if (prev && Math.abs(prev.y - r.y) <= 8 && r.x1 <= prev.x2 + 10) {
						prev.x2 = Math.max(prev.x2, r.x2);
					} else {
						merged.push({ y: r.y, x1: r.x1, x2: r.x2 });
					}
				}
				const bottom = y + CAT_H;
				edges = merged.filter((e) => {
					if (e.x2 - e.x1 < MIN_LEDGE) return false;
					// don't stand on a ledge that overlaps the cat's own box
					if (e.y >= bottom - 8 && e.y <= bottom + 8 && x < e.x2 && x + CAT_W > e.x1) return false;
					return true;
				});
			}
			function scanEdgesIfStale(force) {
				const now = performance.now();
				if (force || now - lastScan > 3000) scanEdges();
			}

			// ── helpers ─────────────────────────────────────────────────────
			const STATE_CLASSES = [
				"dsh-cat--idle", "dsh-cat--walk", "dsh-cat--hop", "dsh-cat--fall",
				"dsh-cat--hurt", "dsh-cat--recover", "dsh-cat--petted", "dsh-cat--nap",
				"dsh-cat--drag", "dsh-cat--groom", "dsh-cat--groom-scratch", "dsh-cat--groom-lick",
				"dsh-cat--cliff", "dsh-cat--sniff", "dsh-cat--run", "dsh-cat--jump",
				"dsh-cat--teleport", "dsh-cat--teleport-arrive", "dsh-cat--poop-done"
			];
			function setMode(stateName) {
				for (const c of STATE_CLASSES) root.classList.remove(c);
				if (stateName === "idle") {
					root.classList.add("dsh-cat--idle");
					idleSince = performance.now();
				} else if (stateName === "hop") {
					root.classList.add("dsh-cat--walk");
					root.classList.add("dsh-cat--hop");
				} else if (stateName === "edge" || stateName === "ground") root.classList.add("dsh-cat--walk");
				else if (stateName === "fall") root.classList.add("dsh-cat--fall");
				else if (stateName === "hurt") root.classList.add("dsh-cat--hurt");
				else if (stateName === "recover") root.classList.add("dsh-cat--recover");
				else if (stateName === "nap") root.classList.add("dsh-cat--nap");
				else if (stateName === "cliff") root.classList.add("dsh-cat--cliff");
				else if (stateName === "sniff") root.classList.add("dsh-cat--sniff");
				else if (stateName === "run") root.classList.add("dsh-cat--run");
				else if (stateName === "jump") root.classList.add("dsh-cat--jump");
				else if (stateName === "drag") root.classList.add("dsh-cat--drag");
				else if (stateName === "pet") root.classList.add("dsh-cat--petted");
				else if (stateName === "teleport") root.classList.add("dsh-cat--teleport");
				else if (stateName === "poop-done") root.classList.add("dsh-cat--poop-done");
			}
			const paint = () => {
				root.style.transform = "translate3d(" + x + "px," + y + "px,0)";
			};
			function showBubble(text, ms) {
				bubble.textContent = text;
				bubble.classList.add("dsh-cat-bubble--show");
				clearTimeout(bubbleTimer);
				bubbleTimer = setTimeout(() => bubble.classList.remove("dsh-cat-bubble--show"), ms || 2200);
			}
			function showFx() {
				fx.classList.remove("dsh-cat-fx--show");
				void fx.offsetWidth; // restart animation
				fx.classList.add("dsh-cat-fx--show");
			}
			const maybeMeow = () => {
				if (Math.random() > 0.4) return;
				const meows = ["喵~", "喵！", "喵呜~", "～喵～"];
				showBubble(meows[Math.floor(Math.random() * meows.length)]);
			};

			// ── movement ───────────────────────────────────────────────────
			function findHopLedge() {
				scanEdgesIfStale(false);
				const bottom = y + CAT_H;
				let best = null;
				let bestGap = Infinity;
				for (const e of edges) {
					const gap = e.y - bottom;
					if (gap <= 4 || gap > HOP_MAX) continue;
					// the cat must be horizontally under the ledge to hop up
					if (!(x < e.x2 && x + CAT_W > e.x1)) continue;
					if (gap < bestGap) {
						best = e;
						bestGap = gap;
					}
				}
				return best;
			}
			function startEdgeWalk() {
				if (!ledge) { startGroundWalk(); return; }
				state = "edge";
				setMode("edge");
				onLedge = true;
				y = ledge.y - CAT_H;
				ty = y;
				// walk to one end (so it can fall off the cliff there)
				let dir = Math.random() < 0.5 ? -1 : 1;
				tx = dir < 0 ? ledge.x1 : ledge.x2 - CAT_W;
				if (Math.abs(tx - x) < 30) {
					dir = -dir;
					tx = dir < 0 ? ledge.x1 : ledge.x2 - CAT_W;
				}
				speed = 34 + Math.random() * 26;
				root.style.setProperty("--dsh-step", clamp(32 / speed, 0.5, 1.0).toFixed(3) + "s");
				if (Math.random() < 0.18) startRun();
			}
			function startHop() {
				const e = findHopLedge();
				if (!e) { startGroundWalk(); return; }
				state = "hop";
				setMode("hop");
				onLedge = false;
				ledge = e;
				hopFrom = y;
				hopTo = e.y - CAT_H;
				hopT0 = performance.now();
			}
			function startGroundWalk() {
				state = "ground";
				setMode("ground");
				onLedge = false;
				const hop = findHopLedge();
				if (hop) {
					tx = hop.x1 + Math.random() * Math.max(1, hop.x2 - hop.x1 - CAT_W);
					tx = clamp(tx, MARGIN, Math.max(MARGIN, vw() - CAT_W - MARGIN));
				} else {
					tx = rand(MARGIN, Math.max(MARGIN + 1, vw() - CAT_W - MARGIN));
				}
				ty = y;
				speed = 34 + Math.random() * 26;
				root.style.setProperty("--dsh-step", clamp(32 / speed, 0.5, 1.0).toFixed(3) + "s");
				if (Math.random() < 0.18) startRun();
			}
			function pickTeleportSpot(maxX, maxY) {
				scanEdgesIfStale(true);
				// prefer landing on an existing ledge so the cat stands on something
				const usable = edges.filter(
					(e) => e.y > CAT_H + 10 && e.y < vh() - 20 && e.x2 - e.x1 >= CAT_W
				);
				if (usable.length && Math.random() < 0.7) {
					const e = usable[Math.floor(Math.random() * usable.length)];
					const ex = clamp(rand(e.x1, Math.max(e.x1 + 1, e.x2 - CAT_W)), MARGIN, maxX);
					return { x: ex, y: e.y - CAT_H };
				}
				// otherwise anywhere in the viewport — not just the bottom
				return {
					x: rand(MARGIN, maxX),
					y: rand(MARGIN + 30, maxY),
				};
			}
			function startTeleport() {
				state = "teleport";
				setMode("teleport");
				turnTarget = null;
				backing = false;
				root.classList.remove("dsh-cat--backing");
				root.classList.remove("dsh-cat--teleport-arrive");
				void root.offsetWidth; // restart vanish animation
				root.classList.add("dsh-cat--teleport");
				spawnPoof(x + CAT_W / 2, y + CAT_H / 2);
				const maxX = Math.max(MARGIN + 1, vw() - CAT_W - MARGIN);
				const maxY = Math.max(MARGIN + 30, vh() - CAT_H - MARGIN);
				const spot = pickTeleportSpot(maxX, maxY);
				if (reduced) {
					// jump instantly, no animation
					x = spot.x;
					y = spot.y;
					tx = x;
					ty = y;
					ledge = null;
					onLedge = false;
					paint();
					spawnPoof(x + CAT_W / 2, y + CAT_H / 2);
					root.classList.remove("dsh-cat--teleport");
					state = "idle";
					setMode("idle");
					restUntil = performance.now() + rand(1200, 2600);
					return;
				}
				clearTimeout(teleportTimer);
				teleportTimer = setTimeout(() => {
					x = spot.x;
					y = spot.y;
					tx = x;
					ty = y;
					ledge = null;
					onLedge = false;
					paint();
					spawnPoof(x + CAT_W / 2, y + CAT_H / 2);
					root.classList.remove("dsh-cat--teleport");
					void root.offsetWidth;
					root.classList.add("dsh-cat--teleport-arrive");
					teleportTimer = setTimeout(() => {
						root.classList.remove("dsh-cat--teleport-arrive");
						state = "idle";
						setMode("idle");
						restUntil = performance.now() + rand(1200, 2600);
					}, 380);
				}, 340);
			}
			function startFall() {
				state = "fall";
				setMode("fall");
				onLedge = false;
				fallX = x;
				fallY0 = y;
				fallVy = 30;
				const room = Math.max(20, vh() - MARGIN - (y + CAT_H) - 8);
				fallDist = Math.min(100, room);
				const dur = Math.sqrt((2 * fallDist) / FALL_G);
				root.style.setProperty("--dsh-fall-dur", dur.toFixed(3) + "s");
				showFx();
			}
			function puffDust() {
				dust.classList.remove("dsh-cat-dust--puff");
				void dust.offsetWidth;
				dust.classList.add("dsh-cat-dust--puff");
			}
			function spawnPoof(cx, cy) {
				// bright swirling smoke: 10 particles fanning out with rotation
				const poof = document.createElement("div");
				poof.className = "dsh-cat-poof";
				poof.style.left = cx + "px";
				poof.style.top = cy + "px";
				const N = 10;
				for (let k = 0; k < N; k++) {
					const p = document.createElement("i");
					const ang = (k / N) * Math.PI * 2 + rand(-0.4, 0.4);
					const dist = rand(16, 40);
					const size = rand(5, 12);
					p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
					p.style.setProperty("--dy", Math.sin(ang) * dist - 8 + "px");
					p.style.setProperty("--rot", rand(-280, 280) + "deg");
					p.style.width = size + "px";
					p.style.height = size + "px";
					p.style.margin = -size / 2 + "px 0 0 " + -size / 2 + "px";
					poof.appendChild(p);
				}
				document.body.appendChild(poof);
				setTimeout(() => poof.remove(), 900);
			}
			function shakePage() {
				if (reduced) return;
				const el = document.documentElement;
				el.classList.remove("dsh-cat-shake");
				void el.offsetWidth;
				el.classList.add("dsh-cat-shake");
				setTimeout(() => el.classList.remove("dsh-cat-shake"), 420);
			}
			function land() {
				state = "hurt";
				setMode("hurt");
				puffDust();
				shakePage();
				hurtTimer = setTimeout(recover, rand(1700, 2600));
			}
			function startSniff() {
				if (state !== "ground" && state !== "edge") return;
				sniffReturn = state;
				state = "sniff";
				setMode("sniff");
				clearTimeout(sniffTimer);
				sniffTimer = setTimeout(() => {
					if (state === "sniff") {
						state = sniffReturn;
						setMode(sniffReturn);
					}
				}, 1050);
			}
			function startRun() {
				state = "run";
				setMode("run");
				speed = 150 + Math.random() * 70;
				root.style.setProperty("--dsh-step", clamp(0.16 + (220 - speed) / 700, 0.16, 0.28).toFixed(3) + "s");
			}
			function findCrossLedge() {
				scanEdgesIfStale(false);
				if (!ledge) return null;
				const endX = tx;
				const dir = endX <= ledge.x1 + 5 ? -1 : 1;
				let best = null;
				let bestGap = Infinity;
				for (const e of edges) {
					if (e === ledge) continue;
					if (Math.abs(e.y - ledge.y) > 34) continue; // roughly level
					let gap;
					if (dir > 0) {
						if (e.x1 < ledge.x2 - 5) continue;
						gap = e.x1 - ledge.x2;
					} else {
						if (e.x2 > ledge.x1 + 5) continue;
						gap = ledge.x1 - e.x2;
					}
					if (gap < 2 || gap > 140) continue; // jumpable gap
					if (gap < bestGap) {
						bestGap = gap;
						best = e;
					}
				}
				if (!best) return null;
				const landX = dir > 0 ? best.x1 + 4 : best.x2 - CAT_W - 4;
				return { ledge: best, landX };
			}
			function runLedgeArrival(now) {
				const cross = findCrossLedge();
				if (cross && Math.random() < 0.75) {
					startJump(cross.landX, cross.ledge.y - CAT_H, "ledge", cross.ledge);
					return;
				}
				const roll = Math.random();
				if (roll < 0.3) {
					turnTarget = tx <= ledge.x1 + 5 ? ledge.x2 - CAT_W : ledge.x1;
					state = "idle";
					setMode("idle");
					restUntil = now + 300;
				} else if (roll < 0.5) {
					state = "idle";
					setMode("idle");
					restUntil = now + rand(1200, 2200);
				} else {
					state = "cliff";
					setMode("cliff");
					cliffUntil = now + 200;
					showFx();
				}
			}
			function runGroundArrival(now) {
				const hop = findHopLedge();
				if (hop) {
					startHop();
					return;
				}
				state = "idle";
				setMode("idle");
				restUntil = now + rand(1200, 2400);
			}
			function startJump(landX, landY, kind, targetLedge) {
				jumpX0 = x;
				jumpY0 = y;
				jumpX1 = landX;
				jumpY1 = landY;
				const dist = Math.hypot(jumpX1 - jumpX0, jumpY1 - jumpY0);
				jumpArc = Math.max(16, Math.min(42, dist * 0.22));
				jumpDur = clamp(0.35 + dist / 500, 0.35, 0.7);
				jumpT0 = performance.now();
				jumpKind = kind;
				jumpLedge = targetLedge || null;
				state = "jump";
				setMode("jump");
			}
			function landJump() {
				if (jumpKind === "ledge" && jumpLedge) {
					ledge = jumpLedge;
					y = jumpLedge.y - CAT_H;
					onLedge = true;
					startEdgeWalk();
				} else if (jumpKind === "run") {
					state = "run";
					setMode("run");
				} else {
					state = "idle";
					setMode("idle");
					restUntil = performance.now() + 500;
				}
				paint();
			}
			function recover() {
				clearTimeout(hurtTimer);
				state = "recover";
				setMode("recover");
				// sit up and pat the dust off
				setTimeout(() => puffDust(), 620);
				setTimeout(() => puffDust(), 950);
				setTimeout(() => {
					if (state === "recover") {
						state = "idle";
						setMode("idle");
						restUntil = performance.now() + 500;
					}
				}, 1550);
			}
			function maybeGroom() {
				if (state !== "idle" || grooming) return;
				grooming = true;
				const scratch = Math.random() < 0.5;
				root.classList.add("dsh-cat--groom");
				root.classList.add(scratch ? "dsh-cat--groom-scratch" : "dsh-cat--groom-lick");
				clearTimeout(groomTimer);
				groomTimer = setTimeout(() => {
					grooming = false;
					root.classList.remove("dsh-cat--groom", "dsh-cat--groom-scratch", "dsh-cat--groom-lick");
				}, 1350);
			}
			function startNap() {
				state = "nap";
				setMode("nap");
				clearTimeout(napTimer);
				napTimer = setTimeout(() => {
					if (state === "nap") {
						state = "idle";
						setMode("idle");
						mustMove = true;
						restUntil = performance.now() + 600;
					}
				}, rand(12000, 24000));
			}
			function startPoop() {
				if (performance.now() < poopCooldownUntil) return; // still cooling down
				// squat (nap pose) and strain for a while, then drop a poop that stays until clicked
				state = "poop";
				setMode("nap");
				showBubble("嗯…", 2000);
				clearTimeout(poopTimer);
				poopTimer = setTimeout(() => {
					showBubble("💩", 1200);
					leavePoop();
					// proud tail flicks, then sniff the result before moving on
					state = "poop-done";
					setMode("poop-done");
					poopTimer = setTimeout(() => {
						state = "idle";
						setMode("idle");
						restUntil = performance.now() + rand(1200, 2400);
						poopCooldownUntil = performance.now() + rand(30000, 50000);
					}, rand(2600, 3600));
				}, rand(3400, 4600));
			}
			function leavePoop() {
				const el = document.createElement("div");
				el.className = "dsh-cat-poop";
				el.setAttribute("aria-hidden", "true");
				el.innerHTML =
					'<svg viewBox="0 0 26 22" width="13" height="11"><path d="M8 6 C4 6 3 10 5.5 12 C2.5 12.5 2 16 5 18 C4 19.5 5 21 7.5 21 L18.5 21 C21 21 22 19.5 21 18 C24 16 23.5 12.5 20.5 12 C23 10 22 6 18 6 C16 2.5 13 1.5 11 3 C9.5 4 8 4.5 8 6 Z" fill="#a4703f"/><path d="M5.5 12 C2.5 12.5 2 16 5 18 C4 19.5 5 21 7.5 21 L9 21 C8 19 8.5 16.5 10 15 C8 14 6.5 13 5.5 12 Z" fill="#c9965f"/></svg>';
				// drop it behind the cat's rear, whichever way it faces
				const rect = root.getBoundingClientRect();
				const facingLeft = root.classList.contains("dsh-cat--face-left");
				const rearX = facingLeft
					? rect.right - rand(4, 14)
					: rect.left + rand(4, 14);
				el.style.left = rearX + "px";
				el.style.top = (rect.bottom - 10) + "px";
				document.body.appendChild(el);
				void el.offsetWidth;
				el.classList.add("dsh-cat-poop--show");
				el.addEventListener("click", (ev) => {
					ev.stopPropagation();
					ev.preventDefault();
					el.classList.remove("dsh-cat-poop--show");
					el.classList.add("dsh-cat-poop--squish");
					setTimeout(() => el.remove(), 300);
				});
			}
			function startPet() {
				if (state === "pet") return;
				if (state === "hurt") {
					clearTimeout(hurtTimer);
					recover();
				}
				prevState = state;
				state = "pet";
				setMode("pet");
				showBubble("呼噜呼噜~", 1200);
				clearTimeout(petTimer);
				petTimer = setTimeout(() => {
					if (state === "pet") {
						state = "idle";
						setMode("idle");
						restUntil = performance.now() + 400;
					}
				}, 1150);
			}
			function decideNext(now) {
				maybeMeow();
				scanEdgesIfStale(true);
				// occasionally poop where it stands (left behind until clicked)
				if (!mustMove && Math.random() < 0.14) {
					startPoop();
					return;
				}
				// occasionally teleport somewhere else so it doesn't linger at the bottom
				if (!mustMove && Math.random() < 0.12) {
					startTeleport();
					return;
				}
				// mostly the cat lies down and sleeps where it is
				if (mustMove) {
					mustMove = false;
				} else if (Math.random() < 0.75) {
					startNap();
					return;
				}
				const bottom = y + CAT_H;
				const candidates = edges.filter((e) => {
					const gap = e.y - bottom;
					if (gap < -4 || gap > HOP_MAX) return false;
					// must overlap the cat's x-range so it can step/hop onto it
					return x < e.x2 && x + CAT_W > e.x1;
				});
				if (candidates.length && Math.random() < 0.85) {
					candidates.sort((a, b) => Math.abs(a.y - bottom) - Math.abs(b.y - bottom));
					ledge = candidates[0];
					if (Math.abs(ledge.y - bottom) <= 4) startEdgeWalk();
					else startHop();
				} else {
					startGroundWalk();
				}
			}

			// ── main loop ──────────────────────────────────────────────────
			function step(now) {
				const dt = Math.min((now - last) / 1000, 0.05);
				last = now;
				scanEdgesIfStale(false);
				// time-driven teleport: independent of the decision chain so it
				// actually happens every so often (~every 20-45s when idle)
				if (now >= lastTeleportCheck) {
					if (state === "idle" && !dragging && !grooming) {
						startTeleport();
						lastTeleportCheck = now + rand(20000, 45000);
					} else {
						// not a good moment (napping/walking/etc.) — retry soon
						lastTeleportCheck = now + 6000;
					}
				}
				// time-driven poop: also independent of the decision chain
				// (~every 25-60s when idle)
				if (now >= lastPoopCheck) {
					if (state === "idle" && !dragging && !grooming && !reduced) {
						startPoop();
						lastPoopCheck = now + rand(25000, 60000);
					} else {
						lastPoopCheck = now + 6000;
					}
				}
				switch (state) {
					case "idle":
						if (now >= restUntil) {
							if (turnTarget !== null) {
								// a deliberate stop-and-turn before walking back
								tx = turnTarget;
								turnTarget = null;
								state = "edge";
								setMode("edge");
							} else decideNext(now);
						} else if (!grooming && now - idleSince > 900 && Math.random() < dt * 0.12) maybeGroom();
						break;
					case "edge": {
						if (backing) {
							// backing up before turning around (face stays toward the edge)
							const db = backX1 - x;
							const d = Math.abs(db);
							const stepLen = speed * dt;
							if (d <= Math.max(stepLen, 3)) {
								x = backX1;
								backing = false;
								root.classList.remove("dsh-cat--backing");
								turnTarget = tx <= ledge.x1 + 5 ? ledge.x2 - CAT_W : ledge.x1;
								state = "idle";
								setMode("idle");
								restUntil = now + 350;
							} else {
								x += (db / d) * stepLen;
							}
							paint();
							break;
						}
						const dx = tx - x;
						const d = Math.abs(dx);
						const stepLen = speed * dt;
						if (d <= Math.max(stepLen, 3)) {
							x = tx;
							// at the end of the ledge — decide: turn back, rest, or fall
							const roll = Math.random();
							if (roll < 0.45) {
								if (Math.random() < 0.35) {
									// back up a few steps before turning around
									backing = true;
									root.classList.add("dsh-cat--backing");
									const dir = tx <= ledge.x1 + 5 ? 1 : -1;
									backX1 = clamp(x + dir * rand(16, 34), ledge.x1, Math.max(ledge.x1 + 1, ledge.x2 - CAT_W));
									if (Math.abs(backX1 - x) < 12) backing = false; // no room — just turn
									else {
										speed = 20 + Math.random() * 10; // cautious slow backpedal
										root.style.setProperty("--dsh-step", clamp(32 / speed, 0.5, 1.0).toFixed(3) + "s");
									}
								}
								if (!backing) {
									// stop for a beat, then stroll back along the ledge
									turnTarget = tx <= ledge.x1 + 5 ? ledge.x2 - CAT_W : ledge.x1;
									state = "idle";
									setMode("idle");
									restUntil = now + 350;
								}
							} else if (roll < 0.65) {
								// sit and rest right here on the edge
								state = "idle";
								setMode("idle");
								restUntil = now + rand(1500, 3000);
							} else {
								state = "cliff";
								setMode("cliff");
								cliffUntil = now + 230;
								showFx();
							}
						} else {
							x += (dx / d) * stepLen;
							root.classList.toggle("dsh-cat--face-left", dx < 0);
							if (Math.random() < dt * 0.07) startSniff();
						}
						paint();
						break;
					}
					case "cliff":
						if (now >= cliffUntil) startFall();
						break;
					case "run": {
						const dx = tx - x;
						const d = Math.abs(dx);
						const stepLen = speed * dt;
						if (d <= Math.max(stepLen, 4)) {
							x = tx;
							if (onLedge) runLedgeArrival(now);
							else runGroundArrival(now);
						} else {
							x += (dx / d) * stepLen;
							root.classList.toggle("dsh-cat--face-left", dx < 0);
							if (!onLedge && Math.random() < dt * 0.25) {
								const dir = dx < 0 ? -1 : 1;
								startJump(x + dir * rand(60, 90), y, "run", null);
							}
						}
						paint();
						break;
					}
					case "jump": {
						const t = Math.min((now - jumpT0) / (jumpDur * 1000), 1);
						const u = 1 - t;
						x = jumpX0 * u + jumpX1 * t;
						y = jumpY0 * u + jumpY1 * t - jumpArc * 4 * t * u;
						paint();
						if (t >= 1) {
							x = jumpX1;
							y = jumpY1;
							landJump();
						}
						break;
					}
					case "ground": {
						const dx = tx - x;
						const d = Math.abs(dx);
						const stepLen = speed * dt;
						if (d <= Math.max(stepLen, 3)) {
							x = tx;
							// reached a spot under a ledge?
							const hop = findHopLedge();
							if (hop) startHop();
							else {
								state = "idle";
								setMode("idle");
								restUntil = now + rand(1600, 3200);
							}
						} else {
							x += (dx / d) * stepLen;
							root.classList.toggle("dsh-cat--face-left", dx < 0);
							if (Math.random() < dt * 0.07) startSniff();
						}
						paint();
						break;
					}
					case "hop": {
						const t = Math.min((now - hopT0) / 500, 1);
						const lift = hopFrom - hopTo; // positive when hopping up
						y = hopFrom - lift * t + lift * 0.1 * Math.sin(Math.PI * t);
						paint();
						if (t >= 1) {
							y = hopTo;
							startEdgeWalk();
						}
						break;
					}
					case "fall": {
						fallVy += FALL_G * dt;
						const dy = fallVy * dt;
						y += dy;
						x = fallX;
						paint();
						if (y >= fallY0 + fallDist) {
							y = fallY0 + fallDist;
							land();
						}
						break;
					}
					default:
						// hurt / recover / pet: static, timer-driven
						break;
				}
				raf = requestAnimationFrame(step);
			}

			function onResize() {
				x = clamp(x, MARGIN, Math.max(MARGIN, vw() - CAT_W - MARGIN));
				y = clamp(y, MARGIN, Math.max(MARGIN, vh() - CAT_H - MARGIN));
				paint();
				scanEdges();
				if (state === "edge") {
					const bottom = y + CAT_H;
					if (ledge && Math.abs(ledge.y - bottom) > 24) startFall();
				}
			}
			function onScroll() {
				const now = performance.now();
				if (now - lastScrollScan < 500) return;
				lastScrollScan = now;
				scanEdges();
				if (state === "edge") {
					const bottom = y + CAT_H;
					if (ledge && Math.abs(ledge.y - bottom) > 24) startFall();
				}
			}
			function dropCat() {
				scanEdgesIfStale(true);
				const bottom = y + CAT_H;
				// land on a ledge just below if there is one
				let target = null;
				for (const e of edges) {
					if (e.y >= bottom - 2 && e.y <= bottom + 150 && x < e.x2 && x + CAT_W > e.x1) {
						if (!target || e.y < target.y) target = e;
					}
				}
				if (target) {
					ledge = target;
					y = target.y - CAT_H;
					onLedge = true;
					startEdgeWalk();
				} else {
					// dropped in mid-air: fall down from here
					state = "fall";
					setMode("fall");
					onLedge = false;
					fallX = x;
					fallY0 = y;
					fallVy = 0;
					const room = Math.max(20, vh() - MARGIN - (y + CAT_H) - 8);
					fallDist = Math.min(160, room);
					const dur = Math.sqrt((2 * fallDist) / FALL_G);
					root.style.setProperty("--dsh-fall-dur", dur.toFixed(3) + "s");
				}
				paint();
			}
			root.addEventListener("pointerdown", (e) => {
				e.preventDefault();
				e.stopPropagation();
				if (e.pointerType === "mouse" && e.button !== 0) return;
				clearTimeout(hurtTimer);
				clearTimeout(petTimer);
				clearTimeout(napTimer);
				clearTimeout(sniffTimer);
				clearTimeout(teleportTimer);
				clearTimeout(poopTimer);
				root.classList.remove("dsh-cat--teleport", "dsh-cat--teleport-arrive");
				backing = false;
				root.classList.remove("dsh-cat--backing");
				dragging = true;
				dragMoved = false;
				pointerId = e.pointerId;
				pressX = e.clientX;
				pressY = e.clientY;
				const rect = root.getBoundingClientRect();
				dragOffX = e.clientX - rect.left;
				dragOffY = e.clientY - rect.top;
				try {
					root.setPointerCapture(pointerId);
				} catch (err) {
					/* ignore */
				}
				state = "drag";
				setMode("drag");
				showFx();
				root.style.cursor = "grabbing";
			});
			root.addEventListener("pointermove", (e) => {
				if (!dragging || e.pointerId !== pointerId) return;
				if (Math.hypot(e.clientX - pressX, e.clientY - pressY) > 6) dragMoved = true;
				if (dragMoved) {
					x = clamp(e.clientX - dragOffX, -8, Math.max(0, vw() - CAT_W + 8));
					y = clamp(e.clientY - dragOffY, -8, Math.max(0, vh() - CAT_H + 8));
					paint();
				}
			});
			root.addEventListener("pointerup", (e) => {
				if (!dragging || e.pointerId !== pointerId) return;
				dragging = false;
				root.style.cursor = "grab";
				try {
					root.releasePointerCapture(pointerId);
				} catch (err) {
					/* ignore */
				}
				e.preventDefault();
				e.stopPropagation();
				if (!dragMoved) {
					startPet();
				} else {
					dropCat();
				}
			});
			root.addEventListener("contextmenu", (e) => {
				e.preventDefault();
				e.stopPropagation();
				skinIndex = (skinIndex + 1) % SKINS.length;
				svgEl.innerHTML = renderSkin(skinIndex);
				try {
					localStorage.setItem("dsh-cat-skin", String(skinIndex));
				} catch (err) {
					/* storage unavailable — skin just won't persist */
				}
				showBubble(SKINS[skinIndex].name + "！", 1500);
				puffDust();
			});
			window.addEventListener("resize", onResize);
			window.addEventListener("scroll", onScroll, true);

			setMode("idle");
			scanEdges();
			paint();
			if (!reduced) raf = requestAnimationFrame(step);

			return () => {
				cancelAnimationFrame(raf);
				clearTimeout(bubbleTimer);
				clearTimeout(petTimer);
				clearTimeout(hurtTimer);
				clearTimeout(napTimer);
				clearTimeout(groomTimer);
				clearTimeout(sniffTimer);
				clearTimeout(teleportTimer);
				clearTimeout(poopTimer);
				window.removeEventListener("resize", onResize);
				window.removeEventListener("scroll", onScroll, true);
				root.remove();
				style.remove();
			};
		}
		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});
