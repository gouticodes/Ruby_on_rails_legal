(function usersPage() {
  if (document.body.dataset.page !== 'users') return;

  const status = document.getElementById('users-status');
  const tableWrap = document.getElementById('users-table-wrap');
  const cards = document.getElementById('users-cards');
  const search = document.getElementById('user-search');

  let users = [];

  function render(data) {
    if (!data.length) {
      status.textContent = 'No users available.';
      tableWrap.innerHTML = '';
      cards.innerHTML = '';
      return;
    }

    status.textContent = `Showing ${data.length} users.`;
    tableWrap.innerHTML = `
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          ${data
            .map((u) => `<tr><td>${u.name || '-'}</td><td>${u.email || '-'}</td><td>${u.role || '-'}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    `;

    cards.innerHTML = data
      .map(
        (u) => `<article class="entity-card"><h3>${u.name || '-'}</h3><p>${u.email || '-'}</p><small>${u.role || '-'}</small></article>`
      )
      .join('');
  }

  function filter() {
    const q = search.value.trim().toLowerCase();
    if (!q) return render(users);

    const filtered = users.filter((user) =>
      [user.name, user.email, user.role].join(' ').toLowerCase().includes(q)
    );
    render(filtered);
  }

  status.textContent = 'Loading users...';
  api
    .getUsers()
    .then((data) => {
      users = Array.isArray(data) ? data : [];
      render(users);
    })
    .catch((error) => {
      status.textContent = `Error loading users: ${error.message}`;
    });

  search.addEventListener('input', filter);
})();
