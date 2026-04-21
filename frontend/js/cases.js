(function casesPage() {
  if (document.body.dataset.page !== 'cases') return;

  const status = document.getElementById('cases-status');
  const tableWrap = document.getElementById('cases-table-wrap');
  const search = document.getElementById('case-search');
  const addBtn = document.getElementById('add-case-btn');

  const modal = document.getElementById('case-modal');
  const closeModalBtn = document.getElementById('close-modal');
  const form = document.getElementById('case-form');
  const modalTitle = document.getElementById('modal-title');

  const fields = {
    id: document.getElementById('case-id'),
    title: document.getElementById('case-title'),
    caseNumber: document.getElementById('case-number'),
    jurisdiction: document.getElementById('case-jurisdiction'),
    status: document.getElementById('case-status'),
    clientId: document.getElementById('case-user'),
    summary: document.getElementById('case-summary')
  };

  let cases = [];

  function openModal(caseData) {
    modal.classList.remove('hidden');

    if (caseData) {
      modalTitle.textContent = 'Edit Case';
      fields.id.value = caseData.id;
      fields.title.value = caseData.title;
      fields.caseNumber.value = caseData.case_number;
      fields.jurisdiction.value = caseData.jurisdiction;
      fields.status.value = caseData.status;
      fields.clientId.value = caseData.client_id;
      fields.summary.value = caseData.summary || '';
    } else {
      modalTitle.textContent = 'Add Case';
      form.reset();
      fields.id.value = '';
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  function render(data) {
    if (!data.length) {
      status.textContent = 'No cases found.';
      tableWrap.innerHTML = '';
      return;
    }

    status.textContent = `Showing ${data.length} cases.`;

    tableWrap.innerHTML = `
      <table>
        <thead><tr><th>Title</th><th>Status</th><th>Assigned User</th><th>Actions</th></tr></thead>
        <tbody>
          ${data
            .map(
              (c) => `<tr>
                <td>${c.title}</td>
                <td>${c.status}</td>
                <td>${c.assigned_user || '-'}</td>
                <td>
                  <button class="btn btn-secondary" data-action="edit" data-id="${c.id}">Edit</button>
                  <button class="btn btn-danger" data-action="delete" data-id="${c.id}">Delete</button>
                </td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table>
    `;
  }

  function filter() {
    const q = search.value.trim().toLowerCase();
    if (!q) return render(cases);

    render(cases.filter((c) => [c.title, c.status, c.assigned_user].join(' ').toLowerCase().includes(q)));
  }

  function refreshCases() {
    status.textContent = 'Loading cases...';

    return api
      .getCases()
      .then((data) => {
        cases = Array.isArray(data) ? data : [];
        render(cases);
      })
      .catch((error) => {
        status.textContent = `Error loading cases: ${error.message}`;
      });
  }

  function loadUsersForSelect() {
    return api.getUsers().then((users) => {
      fields.clientId.innerHTML = users
        .map((user) => `<option value="${user.id}">${user.name} (${user.email})</option>`)
        .join('');
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const payload = {
      title: fields.title.value,
      case_number: fields.caseNumber.value,
      jurisdiction: fields.jurisdiction.value,
      status: fields.status.value,
      client_id: Number(fields.clientId.value),
      summary: fields.summary.value
    };

    const id = fields.id.value;
    const action = id ? api.updateCase(id, payload) : api.createCase(payload);

    action
      .then(() => {
        window.appUI.showToast(id ? 'Case updated.' : 'Case created.');
        closeModal();
        refreshCases();
      })
      .catch((error) => window.appUI.showToast(`Save failed: ${error.message}`));
  });

  tableWrap.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const action = button.dataset.action;
    const id = Number(button.dataset.id);
    const caseData = cases.find((item) => item.id === id);

    if (action === 'edit' && caseData) {
      openModal(caseData);
      return;
    }

    if (action === 'delete') {
      api
        .deleteCase(id)
        .then(() => {
          window.appUI.showToast('Case deleted.');
          refreshCases();
        })
        .catch((error) => window.appUI.showToast(`Delete failed: ${error.message}`));
    }
  });

  addBtn.addEventListener('click', () => openModal());
  closeModalBtn.addEventListener('click', closeModal);
  search.addEventListener('input', filter);

  Promise.all([loadUsersForSelect(), refreshCases()]).catch((error) => {
    status.textContent = `Initialization failed: ${error.message}`;
  });
})();
