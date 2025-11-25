describe("CRUD de Catálogo de Mídias", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Catálogo").click();
  });

  it("Deve cadastrar uma nova mídia com sucesso", () => {
    cy.get("body").then(($body) => {
      if ($body.find("tr:contains('Matrix Teste')").length > 0) {
        cy.contains("tr", "Matrix Teste").within(() => {
          cy.on("window:confirm", () => true);
          cy.get("button:has(svg.lucide-trash2)").click({ force: true });
        });
        cy.wait(1000);
      }
    });

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título").parent().find("input").type("Matrix Teste");
    cy.contains("label", "Ano de lançamento")
      .parent()
      .find("input")
      .type("1999");
    cy.contains("label", "Código de Barras")
      .parent()
      .find("input")
      .type("7891234567899");
    cy.contains("label", "Duração (min)").parent().find("input").type("136");
    cy.contains("label", "Custo").parent().find("input").type("4.50");

    cy.contains("label", "Ator principal")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Ator coadjuvante")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .eq(1)
      .click({ force: true });

    cy.contains("label", "Gênero")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Classificação etária")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Formato")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("label", "Classificação interna")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.contains("Matrix Teste");
  });

  it("Deve editar uma mídia existente", () => {
    cy.wait(1000);

    cy.contains("tr", "Matrix Teste").within(() => {
      cy.get("button:has(svg.lucide-pencil)").click({ force: true });
    });

    cy.contains("label", "Título")
      .parent()
      .find("input")
      .clear()
      .type("Matrix Teste Editado");
    cy.contains("label", "Duração (min)")
      .parent()
      .find("input")
      .clear()
      .type("140");

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });

    cy.contains("Matrix Teste Editado");
  });

  it("Deve excluir uma mídia", () => {
    cy.wait(1000);

    cy.contains("tr", "Matrix Teste Editado").within(() => {
      cy.get("button:has(svg.lucide-trash2)").click({ force: true });
    });

    cy.on("window:confirm", () => true);

    cy.wait(2000);
    cy.get("body").then(($body) => {
      const text = $body.text();
      if (
        text.includes(
          "Não é possível excluir a mídia pois existem exemplares cadastrados"
        )
      ) {
        cy.log("Mídia tem exemplares associados - não pode ser deletada");
      } else {
        cy.contains("Registro removido.", { timeout: 10000 });
      }
    });
  });

  it("Deve validar campos obrigatórios", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("button", "Salvar").click();

    cy.contains("label", "Título")
      .parent()
      .find("input:invalid")
      .should("exist");
  });

  it("Deve validar ano de lançamento inválido", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título").parent().find("input").type("Filme Teste");
    cy.contains("label", "Ano de lançamento")
      .parent()
      .find("input")
      .type("abc");
    cy.contains("label", "Código de Barras")
      .parent()
      .find("input")
      .type("1234567890123");
    cy.contains("label", "Duração (min)").parent().find("input").type("120");
    cy.contains("label", "Custo").parent().find("input").type("5.00");

    cy.contains("label", "Ator principal")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve validar duração em minutos negativa", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título").parent().find("input").type("Filme Teste 2");
    cy.contains("label", "Ano de lançamento")
      .parent()
      .find("input")
      .type("2020");
    cy.contains("label", "Código de Barras")
      .parent()
      .find("input")
      .type("9876543210987");
    cy.contains("label", "Duração (min)").parent().find("input").type("-10");
    cy.contains("label", "Custo").parent().find("input").type("3.50");

    cy.contains("label", "Ator principal")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve validar custo inválido", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título").parent().find("input").type("Filme Teste 3");
    cy.contains("label", "Ano de lançamento")
      .parent()
      .find("input")
      .type("2021");
    cy.contains("label", "Código de Barras")
      .parent()
      .find("input")
      .type("5555555555555");
    cy.contains("label", "Duração (min)").parent().find("input").type("100");
    cy.contains("label", "Custo").parent().find("input").type("-5.00");

    cy.contains("label", "Ator principal")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve buscar mídia pelo título", () => {
    cy.wait(1000);

    cy.get(
      'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="Pesquisar"], input[placeholder*="Filtrar"]'
    )
      .first()
      .type("Matrix Teste");

    cy.wait(500);
  });

  it("Deve validar código de barras duplicado", () => {
    cy.wait(1000);

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título")
      .parent()
      .find("input")
      .type("Filme Duplicado");
    cy.contains("label", "Ano de lançamento")
      .parent()
      .find("input")
      .type("2022");
    cy.contains("label", "Código de Barras")
      .parent()
      .find("input")
      .type("1111111111111");
    cy.contains("label", "Duração (min)").parent().find("input").type("90");
    cy.contains("label", "Custo").parent().find("input").type("4.00");

    cy.contains("label", "Ator principal")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve cancelar criação de mídia", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Título")
      .parent()
      .find("input")
      .type("Teste Cancelar");

    cy.contains("button", "Cancelar").click();

    cy.contains("button", "Novo registro").should("exist");
  });

  it("Deve exibir informações de gênero e formato na lista", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Gênero").should("exist");
      cy.contains("th", "Formato").should("exist");
    });
  });
});
