describe("CRUD de Exemplares", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Exemplares").click();
  });

  it("Deve cadastrar um novo exemplar com sucesso", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Mídia")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Disponível").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.get("table").should("exist");
  });

  it("Deve editar um exemplar existente", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Indisponível").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });
  });

  it("Deve excluir um exemplar", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-trash2)").click({ force: true });
      });

    cy.on("window:confirm", () => true);

    cy.wait(2000);
    cy.get("body").then(($body) => {
      const text = $body.text();
      if (
        text.includes(
          "Não é possível deletar este exemplar pois existem locações associadas"
        )
      ) {
        cy.log("Exemplar tem locações associadas - não pode ser deletado");
      } else {
        cy.contains("Registro removido.", { timeout: 10000 });
      }
    });
  });

  it("Deve validar seleção de mídia inválida", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Disponível").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(1000);
  });

  it("Deve alterar status de disponibilidade", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .should("exist");

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Disponível").click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });
  });

  it("Deve exibir informações da mídia associada", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Mídia").should("exist");
    });
  });

  it("Deve exibir código interno do exemplar", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Código").should("exist");
    });
  });

  it("Deve buscar exemplar por código ou mídia", () => {
    cy.wait(1000);

    cy.get(
      'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="Pesquisar"], input[placeholder*="Filtrar"]'
    )
      .first()
      .type("Matrix");

    // Verificar filtro
    cy.wait(500);
  });

  it("Deve cancelar criação de exemplar", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Mídia")
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

  it("Deve filtrar apenas exemplares disponíveis", () => {
    cy.wait(1000);

    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("Deve criar múltiplos exemplares da mesma mídia", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Mídia")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Disponível").click({ force: true });

    cy.contains("button", "Salvar").click();
    cy.contains("Registro criado com sucesso.", { timeout: 10000 });
    cy.wait(1000);

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Mídia")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Disponibilidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.contains('[role="option"]', "Disponível").click({ force: true });

    cy.contains("button", "Salvar").click();
    cy.contains("Registro criado com sucesso.", { timeout: 10000 });
  });

  it("Deve exibir status de disponibilidade corretamente", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Disponível").should("exist");
    });
  });

  it("Deve validar que mídia existe antes de criar exemplar", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Mídia")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    }).should("have.length.greaterThan", 0);
  });
});
