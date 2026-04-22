const API_BASE = '/api';

// Utilities
const fetchJson = async (url, options = {}) => {
    const defaultOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const response = await fetch(`${API_BASE}${url}`, { ...defaultOptions, ...options });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
};

const appContent = document.getElementById('app-content');
const pageTitle = document.getElementById('page-title');

const showLoading = () => {
    appContent.innerHTML = '<div class="loading-spinner"></div>';
};

const showError = (err) => {
    appContent.innerHTML = `
        <div class="empty-state">
            <span class="material-icons-round" style="color: var(--danger)">error_outline</span>
            <h3>Error loading data</h3>
            <p>${err.message}</p>
        </div>
    `;
};

// Views
const renderDashboard = async () => {
    pageTitle.textContent = 'Dashboard';
    showLoading();
    try {
        const data = await fetchJson('/');
        const { metrics, recent_cases } = data;
        
        let html = '<div class="metrics-grid">';
        for (const [key, val] of Object.entries(metrics)) {
            const label = key.replace(/_/g, ' ');
            html += `
                <article class="metric-card glass-effect">
                    <p class="metric-label">${label}</p>
                    <h2 class="metric-value">${val}</h2>
                </article>
            `;
        }
        html += '</div>';

        html += `
            <div class="table-container glass-effect">
                <div class="table-header-row">
                    <h3>Recent Cases</h3>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Case #</th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Client</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (recent_cases.length === 0) {
            html += `<tr><td colspan="4" class="empty-state">No recent cases</td></tr>`;
        } else {
            for (const c of recent_cases) {
                const statusClass = ['open', 'active', 'closed', 'pending'].includes(c.status) ? c.status : 'default';
                const clientName = c.client ? c.client.name : c.client_name || 'N/A';
                html += `
                    <tr>
                        <td><strong>${c.case_number}</strong></td>
                        <td>${c.title}</td>
                        <td><span class="badge ${statusClass}">${c.status}</span></td>
                        <td>${clientName}</td>
                    </tr>
                `;
            }
        }
        
        html += '</tbody></table></div>';
        appContent.innerHTML = html;
        
    } catch (err) {
        showError(err);
    }
};

const renderCases = async () => {
    pageTitle.textContent = 'Legal Cases';
    showLoading();
    try {
        const cases = await fetchJson('/legal_cases');
        
        let html = `
            <div class="table-container glass-effect">
                <div class="table-header-row">
                    <h3>All Matters</h3>
                    <button class="btn btn-primary"><span class="material-icons-round">add</span> New Case</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Case Number</th>
                            <th>Title</th>
                            <th>Jurisdiction</th>
                            <th>Status</th>
                            <th>Client</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (cases.length === 0) {
            html += `<tr><td colspan="5" class="empty-state">No cases found</td></tr>`;
        } else {
            for (const c of cases) {
                const statusClass = ['open', 'active', 'closed', 'pending'].includes(c.status) ? c.status : 'default';
                const clientName = c.client ? c.client.name : 'Unknown';
                html += `
                    <tr>
                        <td><strong>${c.case_number || 'N/A'}</strong></td>
                        <td>${c.title}</td>
                        <td>${c.jurisdiction || 'N/A'}</td>
                        <td><span class="badge ${statusClass}">${c.status}</span></td>
                        <td>${clientName}</td>
                    </tr>
                `;
            }
        }
        
        html += '</tbody></table></div>';
        appContent.innerHTML = html;
        
    } catch (err) {
        showError(err);
    }
};

const renderClients = async () => {
    pageTitle.textContent = 'Clients';
    showLoading();
    try {
        const clients = await fetchJson('/clients');
        
        let html = `
            <div class="table-container glass-effect">
                <div class="table-header-row">
                    <h3>Client Directory</h3>
                    <button class="btn btn-primary"><span class="material-icons-round">person_add</span> Add Client</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        if (clients.length === 0) {
            html += `<tr><td colspan="4" class="empty-state">No clients found</td></tr>`;
        } else {
            for (const c of clients) {
                html += `
                    <tr>
                        <td><strong>${c.name}</strong></td>
                        <td>${c.email || 'N/A'}</td>
                        <td>${c.phone || 'N/A'}</td>
                        <td><span class="badge ${c.active ? 'active' : 'inactive'}">${c.active ? 'Active' : 'Inactive'}</span></td>
                    </tr>
                `;
            }
        }
        
        html += '</tbody></table></div>';
        appContent.innerHTML = html;
        
    } catch (err) {
        showError(err);
    }
};

// Navigation
const navLinks = {
    'nav-dashboard': renderDashboard,
    'nav-cases': renderCases,
    'nav-clients': renderClients
};

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Render view
        const id = e.currentTarget.id;
        if (navLinks[id]) navLinks[id]();
    });
});

// Initial Render
renderDashboard();
