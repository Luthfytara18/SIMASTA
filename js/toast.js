// TOAST NOTIFICATION dipakai di semua halaman
function ensureToastContainer() {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = "success", duration = 3500) {
  const container = ensureToastContainer();

  const iconMap = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    info: "bi-info-circle-fill",
  };
  const icon = iconMap[type] || iconMap.info;

  const toast = document.createElement("div");
  toast.className = `app-toast app-toast-${type}`;
  toast.innerHTML = `
    <i class="bi ${icon}"></i>
    <span>${message}</span>
    <button type="button" class="toast-close">&times;</button>
  `;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("show"));

  function removeToast() {
    toast.classList.remove("show");
    toast.classList.add("hide");
    setTimeout(() => toast.remove(), 250);
  }

  toast.querySelector(".toast-close").addEventListener("click", removeToast);
  setTimeout(removeToast, duration);
}

// BACA PESAN DARI URL setelah redirect PHP
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const toastType = params.get("toast");
  const toastMsg = params.get("msg");

  if (toastType && toastMsg) {
    showToast(decodeURIComponent(toastMsg), toastType);

    // Bersihkan query string dari URL biar toast nggak muncul lagi kalau di-refresh
    params.delete("toast");
    params.delete("msg");
    const newQuery = params.toString();
    const newUrl = window.location.pathname + (newQuery ? "?" + newQuery : "");
    window.history.replaceState({}, "", newUrl);
  }
});
