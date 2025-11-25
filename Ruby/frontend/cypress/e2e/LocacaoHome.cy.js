describe("Fluxo principal do sistema de Midias", () => {
  it("Visita a Dashboard e verifica título", () => {
    visitaEntrar();
    cy.contains("Old Store Media");
  });

  it("Visita a Dashboard e verifica Clientes", () => {
    visitaEntrar();
    cy.contains("Clientes");
    cy.contains("button", "Clientes").click();
  });

  it("Visita a Dashboard e verifica Locações", () => {
    visitaEntrar();
    cy.contains("Locações");
    cy.contains("button", "Locações").click();
  });

  it("Visita a Dashboard e verifica Catálogo", () => {
    visitaEntrar();
    cy.contains("Catálogo");
    cy.contains("button", "Catálogo").click();
  });

  it("Visita a Dashboard e verifica Atores", () => {
    visitaEntrar();
    cy.contains("Atores");
    cy.contains("button", "Atores").click();
  });

  it("Visita a Dashboard e verifica Exemplares", () => {
    visitaEntrar();
    cy.contains("Exemplares");
    cy.contains("button", "Exemplares").click();
  });

  it("Visita a Dashboard e verifica Gêneros", () => {
    visitaEntrar();
    cy.contains("Gêneros");
    cy.contains("button", "Gêneros").click();
  });

  it("Visita a Dashboard e verifica Botão de Sair", () => {
    visitaEntrar();
    cy.contains("Sair");
    cy.contains("button", "Sair").click();
  });

  // Função de Entrar no sistema
  function visitaEntrar() {
    cy.visit("/");
    cy.contains("Entrar");
    cy.contains("button", "Entrar").click();
  }
});
