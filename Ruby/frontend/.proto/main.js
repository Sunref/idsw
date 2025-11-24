let windowCounter = 0;
let windows = [];
let activeWindow = null;
let isDragging = false;
let isResizing = false;
let currentWindow = null;
let offset = { x: 0, y: 0 };

const appContents = {
	dashboard: `
        <div class="section-header">📊 Dashboard Geral</div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-label">Clientes Ativos</div>
                <div class="stat-value">156</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">🎬</div>
                <div class="stat-label">Mídias no Catálogo</div>
                <div class="stat-value">842</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">📅</div>
                <div class="stat-label">Locações Ativas</div>
                <div class="stat-value">23</div>
            </div>
            <div class="stat-card">
                <div class="stat-icon">💰</div>
                <div class="stat-label">Faturamento Mês</div>
                <div class="stat-value">R$ 4.5k</div>
            </div>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Mídia</th>
                        <th>Data Locação</th>
                        <th>Devolução</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>João da Silva</td>
                        <td>Matrix (DVD)</td>
                        <td>10/11/2025</td>
                        <td>17/11/2025</td>
                        <td><span class="badge badge-success">Em dia</span></td>
                    </tr>
                    <tr>
                        <td>Maria Rodrigues</td>
                        <td>Harry Potter (BluRay)</td>
                        <td>05/11/2025</td>
                        <td>12/11/2025</td>
                        <td><span class="badge badge-danger">Atrasado</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	atores: `
        <div class="section-header">🎭 Cadastro de Atores</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Novo Ator</button>
            <button class="btn btn-secondary">🔍 Buscar</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Data de Estreia</th>
                        <th>Filmes</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Keanu</td>
                        <td>Reeves</td>
                        <td>10/10/1980</td>
                        <td>1 filme(s)</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">🎬</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Laurence</td>
                        <td>Fishburne</td>
                        <td>10/10/1970</td>
                        <td>1 filme(s)</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">🎬</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Daniel</td>
                        <td>Radcliffe</td>
                        <td>10/10/1999</td>
                        <td>1 filme(s)</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">🎬</button>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Emma</td>
                        <td>Watson</td>
                        <td>10/10/2000</td>
                        <td>1 filme(s)</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">🎬</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	exemplares: `
        <div class="section-header">💿 Controle de Exemplares</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Novo Exemplar</button>
            <button class="btn btn-secondary">🔍 Buscar</button>
            <button class="btn btn-secondary">📊 Disponibilidade</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Mídia</th>
                        <th>Status</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>001</td>
                        <td>Harry Potter e a Pedra Filosofal</td>
                        <td><span class="badge badge-success">Disponível</span></td>
                        <td>BluRay</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🚫</button>
                        </td>
                    </tr>
                    <tr>
                        <td>002</td>
                        <td>Harry Potter e a Pedra Filosofal</td>
                        <td><span class="badge badge-success">Disponível</span></td>
                        <td>BluRay</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🚫</button>
                        </td>
                    </tr>
                    <tr>
                        <td>007</td>
                        <td>Matrix</td>
                        <td><span class="badge badge-success">Disponível</span></td>
                        <td>DVD</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🚫</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	generos: `
        <div class="section-header">🏷️ Gêneros de Mídia</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Novo Gênero</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Descrição</th>
                        <th>Qtd. Mídias</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Comédia</td>
                        <td>145 mídias</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Aventura</td>
                        <td>230 mídias</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Ação</td>
                        <td>320 mídias</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	clientes: `
        <div class="section-header">👥 Gerenciamento de Clientes</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Novo Cliente</button>
            <button class="btn btn-secondary">🔍 Buscar</button>
            <button class="btn btn-secondary">📊 Relatório</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Email</th>
                        <th>Cidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>João da Silva</td>
                        <td>111.111.111-11</td>
                        <td>joao@joao.com.br</td>
                        <td>Vargem Grande do Sul - SP</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Maria Rodrigues</td>
                        <td>222.222.222-22</td>
                        <td>mariarod@gmail.com</td>
                        <td>Vargem Grande do Sul - SP</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Marcela dos Santos</td>
                        <td>333.333.333-33</td>
                        <td>mdossantos@uol.com.br</td>
                        <td>Vargem Grande do Sul - SP</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                            <button class="btn btn-danger" style="padding: 6px 12px;">🗑️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	midias: `
        <div class="section-header">🎬 Catálogo de Mídias</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Nova Mídia</button>
            <button class="btn btn-secondary">🔍 Buscar</button>
            <button class="btn btn-secondary">🏷️ Filtrar por Gênero</button>
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Ano</th>
                        <th>Gênero</th>
                        <th>Formato</th>
                        <th>Valor</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Harry Potter e a Pedra Filosofal</td>
                        <td>2001</td>
                        <td>Aventura</td>
                        <td><span class="badge badge-success">BluRay</span></td>
                        <td>R$ 5,50</td>
                        <td>6 unidades</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">👁️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Matrix</td>
                        <td>1999</td>
                        <td>Ação</td>
                        <td><span class="badge badge-warning">DVD</span></td>
                        <td>R$ 4,00</td>
                        <td>4 unidades</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">👁️</button>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">✏️</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
	locacoes: `
        <div class="section-header">📅 Controle de Locações</div>

        <div class="toolbar">
            <button class="btn btn-primary">➕ Nova Locação</button>
            <button class="btn btn-secondary">📋 Devoluções Pendentes</button>
            <button class="btn btn-secondary">💰 Faturamento</button>
        </div>

        <div style="background: rgba(245, 107, 57, 0.1); border: 1px solid rgba(253, 214, 100, 0.3); padding: 16px; margin-bottom: 24px; border-radius: 12px; color: #fdd264;">
            ⚠️ <strong>Atenção:</strong> 2 devoluções estão atrasadas!
        </div>

        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Data Início</th>
                        <th>Data Fim</th>
                        <th>Status</th>
                        <th>Valor Total</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>João da Silva</td>
                        <td>10/11/2025</td>
                        <td>17/11/2025</td>
                        <td><span class="badge badge-success">Ativa</span></td>
                        <td>R$ 15,50</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">📄</button>
                            <button class="btn btn-primary" style="padding: 6px 12px;">✓</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Maria Rodrigues</td>
                        <td>05/11/2025</td>
                        <td>12/11/2025</td>
                        <td><span class="badge badge-danger">Atrasada</span></td>
                        <td>R$ 10,00</td>
                        <td>
                            <button class="btn btn-secondary" style="padding: 6px 12px;">📄</button>
                            <button class="btn btn-primary" style="padding: 6px 12px;">✓</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
};

const appTitles = {
	dashboard: "Dashboard",
	clientes: "Clientes",
	midias: "Catálogo de Mídias",
	locacoes: "Locações",
	atores: "Atores",
	exemplares: "Exemplares",
	generos: "Gêneros",
};

const appIcons = {
	dashboard: "📊",
	clientes: "👥",
	midias: "🎬",
	locacoes: "📅",
	atores: "🎭",
	exemplares: "💿",
	generos: "🏷️",
};

const appColors = {
	dashboard:
		"linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	clientes:
		"linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	midias: "linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	locacoes:
		"linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	atores: "linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	exemplares:
		"linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
	generos:
		"linear-gradient(135deg, rgba(64, 156, 255, 0.2) 0%, rgba(152, 179, 255, 0.2) 100%)",
};

function openWindow(appId) {
	// Sempre limpar tudo para trocar a janela
	const desktop = document.getElementById("desktop");
	desktop.innerHTML = "";

	// Zerar o registro de janelas abertas
	windows = [];

	// Criar nova janela
	const windowId = `window-${++windowCounter}`;
	const windowEl = document.createElement("div");
	windowEl.className = "window active";
	windowEl.id = windowId;

	windowEl.style.left = `185px`;
	windowEl.style.top = `150px`;
	windowEl.style.width = "1280px";
	windowEl.style.height = "720px";
	windowEl.style.zIndex = 100;

	windowEl.innerHTML = `
        <div class="window-titlebar">
            <div class="window-title">
                <div class="window-icon" style="background: ${appColors[appId]};">${appIcons[appId]}</div>
                <span>${appTitles[appId]}</span>
            </div>
            <div class="window-controls">
                <div class="window-control-btn close" onclick="closeWindow('${windowId}')">
                    <span style="font-size: 18px;">✕</span>
                </div>
            </div>
        </div>

        <div class="window-content">
            ${appContents[appId]}
        </div>

        <div class="window-resize"></div>
    `;

	desktop.appendChild(windowEl);

	// (Se quiser esconder barra de status, este bloco pode ser apagado)
	const statusbar = document.getElementById("statusbar");
	if (statusbar) {
		const statusItem = document.createElement("div");
		statusItem.className = "status-item active";
		statusItem.id = `status-${windowId}`;
		statusItem.onclick = () => restoreWindow(windowId);
		statusItem.innerHTML = `
            <span>${appIcons[appId]}</span>
            <span>${appTitles[appId]}</span>
        `;
	}

	windows.push({ id: windowId, appId });

	setActiveWindow(windowId);
	setupWindowEvents(windowEl);
}

function setupWindowEvents(windowEl) {
	const titlebar = windowEl.querySelector(".window-titlebar");
	const resizeHandle = windowEl.querySelector(".window-resize");

	titlebar.addEventListener("mousedown", (e) => {
		if (e.target.closest(".window-control-btn")) return;
		isDragging = true;
		currentWindow = windowEl;
		setActiveWindow(windowEl.id);

		const rect = windowEl.getBoundingClientRect();
		offset.x = e.clientX - rect.left;
		offset.y = e.clientY - rect.top;
	});

	resizeHandle.addEventListener("mousedown", (e) => {
		e.stopPropagation();
		isResizing = true;
		currentWindow = windowEl;
		setActiveWindow(windowEl.id);
	});

	windowEl.addEventListener("mousedown", () => {
		setActiveWindow(windowEl.id);
	});
}

document.addEventListener("mousemove", (e) => {
	if (
		isDragging &&
		currentWindow &&
		!currentWindow.classList.contains("maximized")
	) {
		const desktop = document.getElementById("desktop");
		const desktopRect = desktop.getBoundingClientRect();

		let newX = e.clientX - offset.x - desktopRect.left;
		let newY = e.clientY - offset.y;

		newX = Math.max(
			0,
			Math.min(newX, desktopRect.width - currentWindow.offsetWidth),
		);
		newY = Math.max(
			0,
			Math.min(
				newY,
				desktopRect.height - currentWindow.offsetHeight - 50,
			),
		);

		currentWindow.style.left = newX + "px";
		currentWindow.style.top = newY + "px";
	}

	if (isResizing && currentWindow) {
		const rect = currentWindow.getBoundingClientRect();
		const newWidth = e.clientX - rect.left;
		const newHeight = e.clientY - rect.top;

		if (newWidth > 600) currentWindow.style.width = newWidth + "px";
		if (newHeight > 400) currentWindow.style.height = newHeight + "px";
	}
});

document.addEventListener("mouseup", () => {
	isDragging = false;
	isResizing = false;
	currentWindow = null;
});

function setActiveWindow(windowId) {
	document.querySelectorAll(".window").forEach((w) => {
		w.classList.remove("active");
		w.style.zIndex = "50";
	});
	document.querySelectorAll(".status-item").forEach((t) => {
		t.classList.remove("active");
	});

	const windowEl = document.getElementById(windowId);
	const statusEl = document.getElementById(`status-${windowId}`);

	if (windowEl) {
		windowEl.classList.add("active");
		windowEl.style.zIndex = "100";
	}
	if (statusEl) {
		statusEl.classList.add("active");
	}

	activeWindow = windowId;
}

function closeWindow(windowId) {
	const desktop = document.getElementById("desktop");
	if (desktop) desktop.innerHTML = ""; // remove janelas do DOM

	// limpar array de janelas em memória
	windows = [];
}

function restoreWindow(windowId) {
	const windowEl = document.getElementById(windowId);

	if (windowEl) {
		windowEl.classList.remove("minimized");
		setActiveWindow(windowId);
	}
}

function logout() {
	window.location.href = "index.html";
}
