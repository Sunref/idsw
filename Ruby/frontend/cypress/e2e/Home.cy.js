describe("Fluxo principal Locadora de Mídias", () => {
	it("Visita a página inicial e verifica título", () => {
		cy.visit("/");
		cy.contains("Old Store Media");
	});

	it("Visita a página inicial e verifica Tecnologias", () => {
		cy.visit("/");
		cy.contains("Tecnologias");
		cy.contains("button", "Tecnologias").click();
	});

	it("Visita a página inicial e verifica Tecnologias, volta para a Home", () => {
		cy.visit("/");
		cy.contains("Tecnologias");
		cy.contains("button", "Tecnologias").click();
		cy.contains("Home");
		cy.contains("button", "Home").click();
	});

	it("Visita a página inicial e Entrar no sistema", () => {
		cy.visit("/");
		cy.contains("Entrar");
		cy.contains("button", "Entrar").click();
	});
});
