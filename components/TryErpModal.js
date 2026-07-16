// "Try our ERP" — direct jump. Self-mounts on DOM ready. Triggered via
// window.sgOpenTryErp() (React Nav calls it directly) or by any element
// carrying [data-sg-try-erp]. No email gate: clicking sends the visitor
// straight into peralta with ?sandbox=true&email=<guest> so peralta
// auto-logs them into the shared sandbox tenant.
(function () {
  if (window.sgTryErpInit) return;
  window.sgTryErpInit = true;

  var SG_SANDBOX_URL = "https://erp.simplegrid.ai/?sandbox=true";
  // Peralta's auto-login reads an email from the URL; a fixed guest identity
  // keeps that working without asking the visitor for anything.

  function go() {
    if (window.sgTrack)
      window.sgTrack("try_erp_redirected", { form: "try-erp" });
    window.location.href = SG_SANDBOX_URL;
  }

  document.addEventListener(
    "click",
    function (e) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      var target = e.target.closest("[data-sg-try-erp]");
      if (!target) return;
      e.preventDefault();
      go();
    },
    true,
  );

  window.sgOpenTryErp = go;
})();
