const navigation = [
  { key: 'dashboard', label: 'Dashboard', href: 'index.html' },
  { key: 'users', label: 'Users', href: 'users.html' },
  { key: 'cases', label: 'Cases', href: 'cases.html' },
  { key: 'documents', label: 'Documents', href: 'documents.html' },
  { key: 'profile', label: 'Profile', href: 'profile.html' }
];

function renderSidebar() {
  const page = document.body.dataset.page;
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const links = navigation
    .map((item) => `<a class="nav-link ${item.key === page ? 'active' : ''}" href="${item.href}">${item.label}</a>`)
    .join('');

  sidebar.innerHTML = `<h2>${window.APP_CONFIG?.APP_NAME || 'Legal App'}</h2>${links}`;
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

async function loadDashboard() {
  if (document.body.dataset.page !== 'dashboard') return;

  const [users, cases, documents] = await Promise.all([
    api.getUsers().catch(() => []),
    api.getCases().catch(() => []),
    api.getDocuments().catch(() => [])
  ]);

  document.getElementById('total-users').textContent = users.length;
  document.getElementById('total-cases').textContent = cases.length;
  document.getElementById('total-documents').textContent = documents.length;

  const recentNode = document.getElementById('recent-activity');
  const recentCases = cases.slice(0, 5);

  if (recentCases.length === 0) {
    recentNode.innerHTML = '<div class="list-item">No recent activity found.</div>';
    return;
  }

  recentNode.innerHTML = recentCases
    .map((item) => `<div class="list-item"><strong>${item.title}</strong> - ${item.status} (${item.assigned_user || 'Unassigned'})</div>`)
    .join('');
}

renderSidebar();
loadDashboard().catch((error) => showToast(`Dashboard error: ${error.message}`));

window.appUI = { showToast };
