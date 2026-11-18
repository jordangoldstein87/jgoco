/* Sends a form straight to Jordan through the onboarding script (it emails him with Reply-To set to the sender).
   Nothing opens the visitor's email app. */
window.gdSend = function (data) {
  const SCRIPT = "https://script.google.com/macros/s/AKfycbyR6DNkxGjEpLr56VBQMB_9HDKmVgr3YnFGhqguR9_KTmnniUDI3KuyMF65BJBMWxmG/exec";
  return fetch(SCRIPT, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action: "form", page: location.href.split("?")[0], ...data }) })
    .then((r) => r.json()).catch(() => ({ ok: false, why: "network" }));
};

/* Amos's private interview key rides on the pitch link (?k=...). Keep it for this visit and add it to every interview link. */
(function () {
  let k = new URLSearchParams(location.search).get("k") || "";
  try { if (k) sessionStorage.setItem("gd-k", k); else k = sessionStorage.getItem("gd-k") || ""; } catch (e) {}
  if (!/^[a-f0-9]{20,64}$/i.test(k)) return;
  const fix = () => document.querySelectorAll('a[href^="interview.html"],a[href^="questionnaire.html"]').forEach((a) => { const u = a.getAttribute("href").split("?")[0]; a.setAttribute("href", u + "?k=" + k); });
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fix) : fix();
})();
