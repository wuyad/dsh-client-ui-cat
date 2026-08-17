// dsh-client-ui-cat host half. The cat is pure browser decoration, so this
// node half is deliberately a no-op: it exists so the Loader entry activates
// cleanly at boot (the client-modules node half only scans entries whose
// package resolves, and a missing main would fail the entry loud).
const name = "dsh-client-ui-cat";
function apply() {
	// nothing to do host-side; the browser half (exports["./client"])
	// renders the wandering cat.
}
export { name, apply };
