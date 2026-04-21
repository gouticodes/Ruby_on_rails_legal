const appConfig = window.APP_CONFIG || {};
const API_BASE_URL = (appConfig.API_BASE_URL || '/api').replace(/\/$/, '');
const APP_NAME = appConfig.APP_NAME || 'Legal Case Management System';

const appNameNode = document.getElementById('app-name');
const statusNode = document.getElementById('status-message');
const userListNode = document.getElementById('user-list');
const refreshBtn = document.getElementById('refresh-btn');
const searchInput = document.getElementById('search-input');
const yearNode = document.getElementById('year');

let users = [];

function setStatus(message) {
  statusNode.textContent = message;
}

function renderUsers(items) {
  userListNode.innerHTML = '';

  if (items.length === 0) {
    setStatus('No users found.');
    return;
  }

  setStatus(`Showing ${items.length} user${items.length > 1 ? 's' : ''}.`);

  items.forEach((user) => {
    const card = document.createElement('article');
    card.className = 'user-card';

    card.innerHTML = `
      <div class="user-name">${user.name || 'Unnamed User'}</div>
      <p class="user-meta"><strong>Email:</strong> ${user.email || 'Not provided'}</p>
      <p class="user-meta"><strong>Role:</strong> ${user.role || 'N/A'}</p>
    `;

    userListNode.appendChild(card);
  });
}

function applyFilter() {
  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    renderUsers(users);
    return;
  }

  const filtered = users.filter((user) => {
    const haystack = [user.name, user.email, user.role].join(' ').toLowerCase();
    return haystack.includes(query);
  });

  renderUsers(filtered);
}

async function fetchUsers() {
  setStatus('Loading users...');
  refreshBtn.disabled = true;

  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    users = Array.isArray(data) ? data : [];

    applyFilter();
  } catch (error) {
    userListNode.innerHTML = '';
    setStatus(`Unable to load users. ${error.message}`);
  } finally {
    refreshBtn.disabled = false;
  }
}

function initializeApp() {
  appNameNode.textContent = APP_NAME;
  document.title = APP_NAME;
  yearNode.textContent = new Date().getFullYear();

  refreshBtn.addEventListener('click', fetchUsers);
  searchInput.addEventListener('input', applyFilter);

  fetchUsers();
}

initializeApp();
