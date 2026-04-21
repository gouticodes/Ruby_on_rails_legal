(function documentsPage() {
  if (document.body.dataset.page !== 'documents') return;

  const status = document.getElementById('documents-status');
  const listNode = document.getElementById('documents-list');
  const form = document.getElementById('document-form');
  const nameInput = document.getElementById('document-name');
  const typeInput = document.getElementById('document-type');

  let documents = [];

  function render(data) {
    if (!data.length) {
      status.textContent = 'No documents found.';
      listNode.innerHTML = '';
      return;
    }

    status.textContent = `Showing ${data.length} documents.`;
    listNode.innerHTML = data
      .map(
        (doc) => `<div class="list-item"><strong>${doc.name || 'Untitled'}</strong><br/><small>${doc.document_type || 'N/A'}</small></div>`
      )
      .join('');
  }

  status.textContent = 'Loading documents...';
  api
    .getDocuments()
    .then((data) => {
      documents = Array.isArray(data) ? data : [];
      render(documents);
    })
    .catch((error) => {
      status.textContent = `Could not load from API (${error.message}). Using local mode.`;
    });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    documents.unshift({ name: nameInput.value, document_type: typeInput.value });
    render(documents);
    form.reset();
    window.appUI.showToast('Document added to local list.');
  });
})();
