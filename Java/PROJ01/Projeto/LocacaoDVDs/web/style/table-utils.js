document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".tabelaListagem").forEach(function (table) {
    const tbody = table.tBodies[0];
    if (!tbody) return;

    const headerTexts = Array.from(table.querySelectorAll("thead th")).map(
      (th) => th.textContent.trim()
    );
    Array.from(tbody.querySelectorAll("tr")).forEach(function (row) {
      Array.from(row.querySelectorAll("td")).forEach(function (td, idx) {
        if (!td.hasAttribute("data-label"))
          td.setAttribute("data-label", headerTexts[idx] || "");
      });
    });

    const rows = Array.from(tbody.querySelectorAll("tr"));
    rows.sort(function (a, b) {
      const ai =
        parseInt(
          ((a.cells[0] && a.cells[0].textContent) || "").replace(/\D/g, ""),
          10
        ) || 0;
      const bi =
        parseInt(
          ((b.cells[0] && b.cells[0].textContent) || "").replace(/\D/g, ""),
          10
        ) || 0;
      return ai - bi;
    });
    rows.forEach(function (r) {
      tbody.appendChild(r);
    });

    const headers = table.querySelectorAll("thead th");
    headers.forEach(function (th, idx) {
      th.style.cursor = "pointer";
      th.addEventListener("click", function () {
        const current =
          th.getAttribute("data-sort-dir") === "asc" ? "asc" : "desc";
        const dir = current === "asc" ? "desc" : "asc";
        headers.forEach((h) => h.removeAttribute("data-sort-dir"));
        th.setAttribute("data-sort-dir", dir);

        const sorted = Array.from(tbody.querySelectorAll("tr")).sort(function (
          a,
          b
        ) {
          let A = (a.cells[idx] && a.cells[idx].textContent.trim()) || "";
          let B = (b.cells[idx] && b.cells[idx].textContent.trim()) || "";
          const nA = parseFloat(A.replace(/[^0-9\.-]/g, ""));
          const nB = parseFloat(B.replace(/[^0-9\.-]/g, ""));
          if (!isNaN(nA) && !isNaN(nB))
            return dir === "asc" ? nA - nB : nB - nA;
          A = A.toLowerCase();
          B = B.toLowerCase();
          return dir === "asc" ? A.localeCompare(B) : B.localeCompare(A);
        });
        sorted.forEach(function (r) {
          tbody.appendChild(r);
        });
      });
    });
  });
});
