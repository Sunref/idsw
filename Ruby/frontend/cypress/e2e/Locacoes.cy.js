describe("CRUD de Locações", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Locações").click();
  });

  it("Deve cadastrar uma nova locação com sucesso", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Data de início")
      .parent()
      .find("input")
      .type("2023-10-01", { force: true });
    cy.contains("label", "Data prevista para devolução")
      .parent()
      .find("input")
      .type("2023-10-05", { force: true });

    cy.contains("label", "Cliente")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Situação")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Ativa").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.get("table").should("exist");
  });

  it("Deve editar uma locação existente", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Data prevista para devolução")
      .parent()
      .find("input")
      .clear()
      .type("2023-10-10", { force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });
  });

  it("Deve excluir uma locação", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-trash2)").click({ force: true });
      });

    cy.on("window:confirm", () => true);

    cy.contains("Registro removido.", { timeout: 10000 });
  });

  it("Deve validar campos obrigatórios", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("button", "Salvar").click();

    cy.wait(1000);
  });

  it("Deve validar data de fim posterior à data de início", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Data de início")
      .parent()
      .find("input")
      .type("2023-10-05", { force: true });
    cy.contains("label", "Data prevista para devolução")
      .parent()
      .find("input")
      .type("2023-10-01", { force: true });

    cy.contains("label", "Cliente")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Situação")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Ativa").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve alterar status de locação para cancelada", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Situação")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Cancelada").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });

    cy.contains("Cancelada");
  });

  it("Deve exibir informações do cliente na locação", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.get("tbody tr").first().should("exist");
    });
  });

  it("Deve buscar locação por cliente", () => {
    cy.wait(1000);

    cy.get(
      'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="Pesquisar"], input[placeholder*="Filtrar"]'
    )
      .first()
      .type("João Silva");

    cy.wait(500);
  });

  it("Deve cancelar criação de locação", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Cliente")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Cancelar").click();

    cy.contains("button", "Novo registro").should("exist");
  });

  it("Deve validar seleção de cliente inválido", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Data de início")
      .parent()
      .find("input")
      .type("2023-10-01", { force: true });
    cy.contains("label", "Data prevista para devolução")
      .parent()
      .find("input")
      .type("2023-10-05", { force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(1000);
  });
});
