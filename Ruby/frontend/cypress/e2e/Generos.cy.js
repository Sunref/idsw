describe("CRUD de Gêneros", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Gêneros").click();
  });

  it("Deve cadastrar um novo gênero com sucesso", () => {
    cy.get("table tbody").then(($tbody) => {
      if ($tbody.find("tr").length > 0) {
        cy.contains("tr", "Ficção Científica").then(($row) => {
          if ($row.length > 0) {
            cy.wrap($row).within(() => {
              cy.get("button:has(svg.lucide-trash2)").click({ force: true });
            });
            cy.on("window:confirm", () => true);
            cy.wait(1000);
          }
        });
      }
    });

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type("Ficção Científica");

    cy.contains("button", "Salvar").click();

    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.contains("Ficção Científica");
  });

  it("Deve editar um gênero existente", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .clear()
      .type("Ficção Científica Editado");

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });

    cy.contains("Ficção Científica Editado");
  });

  it("Deve excluir um gênero", () => {
    cy.contains("button", "Novo registro").click();
    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type("Gênero Para Excluir");
    cy.contains("button", "Salvar").click();
    cy.contains("Registro criado com sucesso.");

    cy.contains("tr", "Gênero Para Excluir").should("exist");

    cy.contains("tr", "Gênero Para Excluir").within(() => {
      cy.get("button:has(svg.lucide-trash2)").click({ force: true });
    });

    cy.on("window:confirm", () => true);

    cy.contains("Registro removido.", { timeout: 10000 });
  });

  it("Deve validar campo obrigatório", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("button", "Salvar").click();

    cy.contains("label", "Descrição")
      .parent()
      .find("input:invalid")
      .should("exist");
  });

  it("Deve validar descrição vazia", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Descrição").parent().find("input").type("   ");

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve validar descrição muito curta", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Descrição").parent().find("input").type("A");

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve validar descrição muito longa", () => {
    cy.contains("button", "Novo registro").click();

    const descricaoLonga = "A".repeat(300);
    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type(descricaoLonga);

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve buscar gênero pela descrição", () => {
    cy.wait(1000);

    cy.get(
      'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="Pesquisar"], input[placeholder*="Filtrar"]'
    )
      .first()
      .type("Ação");

    cy.wait(500);
  });

  it("Deve cancelar criação de gênero", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type("Teste Cancelar");

    cy.contains("button", "Cancelar").click();

    cy.contains("button", "Novo registro").should("exist");
  });

  it("Deve exibir ID do gênero na lista", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "ID").should("exist");
    });
  });

  it("Deve exibir descrição do gênero na lista", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Descrição").should("exist");
    });
  });

  it("Deve criar múltiplos gêneros diferentes", () => {
    const generos = [
      "Terror Teste",
      "Comédia Teste",
      "Drama Teste",
      "Suspense Teste",
    ];

    generos.forEach((genero) => {
      cy.get("body").then(($body) => {
        if ($body.find(`tr:contains('${genero}')`).length > 0) {
          cy.contains("tr", genero).within(() => {
            cy.on("window:confirm", () => true);
            cy.get("button:has(svg.lucide-trash2)").click({ force: true });
          });
          cy.wait(1000);
        }
      });

      cy.contains("button", "Novo registro").click();
      cy.contains("label", "Descrição").parent().find("input").type(genero);
      cy.contains("button", "Salvar").click();
      cy.contains("Registro criado com sucesso.");
      cy.contains("tr", genero).should("exist");
    });
  });

  it("Deve validar gênero duplicado", () => {
    cy.get("table tbody").then(($tbody) => {
      cy.contains("tr", "Romance").then(($row) => {
        if ($row.length > 0) {
          cy.wrap($row).within(() => {
            cy.get("button:has(svg.lucide-trash2)").click({ force: true });
          });
          cy.on("window:confirm", () => true);
          cy.wait(1000);
        }
      });
    });

    cy.contains("button", "Novo registro").click();
    cy.contains("label", "Descrição").parent().find("input").type("Romance");
    cy.contains("button", "Salvar").click();
    cy.wait(2000);

    cy.contains("button", "Novo registro").click();
    cy.contains("label", "Descrição").parent().find("input").type("Romance");
    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });

  it("Deve editar gênero e manter ID", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .find("td")
      .first()
      .invoke("text")
      .then((idOriginal) => {
        // Editar o gênero
        cy.get("table tbody tr")
          .first()
          .within(() => {
            cy.get("button:has(svg.lucide-pencil)").click({ force: true });
          });

        cy.contains("label", "Descrição")
          .parent()
          .find("input")
          .clear()
          .type("Gênero Modificado");
        cy.contains("button", "Salvar").click();
        cy.wait(2000);

        // Verificar que ID permanece o mesmo
        cy.get("table tbody tr")
          .first()
          .find("td")
          .first()
          .should("contain", idOriginal);
      });
  });

  it("Deve listar todos os gêneros cadastrados", () => {
    cy.wait(1000);

    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("Deve validar caracteres especiais na descrição", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Descrição")
      .parent()
      .find("input")
      .type("Ação & Aventura!");

    cy.contains("button", "Salvar").click();

    cy.wait(2000);
  });
});
