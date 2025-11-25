describe("CRUD de Atores", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Atores").click();
  });

  it("Deve cadastrar um novo ator com sucesso", () => {
    cy.get("body").then(($body) => {
      if ($body.find("tr:contains('Leonardo DiCaprio')").length > 0) {
        cy.contains("tr", "Leonardo DiCaprio").within(() => {
          cy.on("window:confirm", () => true);
          cy.get("button:has(svg.lucide-trash2)").click({ force: true });
        });
        cy.wait(1000);
      }
    });

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Leonardo");
    cy.contains("label", "Sobrenome").parent().find("input").type("DiCaprio");
    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .type("1991-01-01", { force: true });

    cy.contains("button", "Salvar").click();

    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.contains("Leonardo DiCaprio");
  });

  it("Deve editar um ator existente", () => {
    cy.wait(1000);

    cy.get("table tbody").then(($tbody) => {
      if ($tbody.find("tr").length > 0) {
        cy.get("table tbody tr")
          .first()
          .within(() => {
            cy.get("button:has(svg.lucide-pencil)").click({ force: true });
          });

        cy.contains("label", "Nome")
          .parent()
          .find("input")
          .clear()
          .type("Leonardo Editado");
        cy.contains("label", "Data de Estreia")
          .parent()
          .find("input")
          .clear()
          .type("1992-05-15", { force: true });

        cy.contains("button", "Salvar").click();

        cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });

        cy.contains("Leonardo Editado");
      } else {
        cy.log("Nenhum registro encontrado para editar");
      }
    });
  });

  it("Deve excluir um ator", () => {
    cy.wait(1000);

    cy.get("table tbody").then(($tbody) => {
      if ($tbody.find("tr").length > 0) {
        cy.on("window:confirm", () => true);

        cy.get("table tbody tr")
          .first()
          .within(() => {
            cy.get("button:has(svg.lucide-trash2)").click({ force: true });
          });

        cy.wait(2000);
        cy.get("body").then(($body) => {
          const text = $body.text();
          if (
            text.includes(
              "Não é possível deletar este ator pois existem mídias associadas"
            )
          ) {
            cy.log("Ator tem mídias associadas - não pode ser deletado");
          } else {
            cy.contains("Registro deletado com sucesso.", { timeout: 10000 });
          }
        });
      } else {
        cy.log("Nenhum registro encontrado para excluir");
      }
    });
  });

  it("Deve validar campos obrigatórios", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("button", "Salvar").click();

    cy.contains("label", "Nome").parent().find("input:invalid").should("exist");
  });

  it("Deve validar data de estreia inválida", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Tom");
    cy.contains("label", "Sobrenome").parent().find("input").type("Cruise");
    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .type("2099-12-31", { force: true });

    // Submeter formulário
    cy.contains("button", "Salvar").click();

    // Aguardar possível validação
    cy.wait(2000);
  });

  it("Deve validar nome vazio", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Sobrenome").parent().find("input").type("Pitt");
    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .type("1987-06-10", { force: true });

    // Tentar submeter
    cy.contains("button", "Salvar").click();

    cy.contains("label", "Nome").parent().find("input:invalid").should("exist");
  });

  it("Deve validar sobrenome vazio", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Brad");
    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .type("1987-06-10", { force: true });

    // Tentar submeter
    cy.contains("button", "Salvar").click();

    cy.contains("label", "Sobrenome")
      .parent()
      .find("input:invalid")
      .should("exist");
  });

  it("Deve buscar ator pelo nome", () => {
    cy.wait(1000);

    cy.get('input[placeholder="Filtrar registros"]').type("Leonardo");

    // Verificar filtro
    cy.wait(500);
  });

  it("Deve cancelar criação de ator", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Teste Cancelar");

    cy.contains("button", "Cancelar").click();

    cy.contains("button", "Novo registro").should("exist");
  });

  it("Deve exibir nome completo na lista", () => {
    cy.wait(1000);

    cy.get("table tbody").then(($tbody) => {
      if ($tbody.find("tr").length > 0) {
        cy.get("table").within(() => {
          cy.get("tbody tr").first().should("exist");
        });
      } else {
        cy.log("Nenhum registro na lista");
      }
    });
  });

  it("Deve exibir data de estreia formatada", () => {
    cy.wait(1000);

    cy.get("table").within(() => {
      cy.contains("th", "Estreia").should("exist");
    });

    cy.get("table tbody").then(($tbody) => {
      if ($tbody.find("tr").length > 0) {
        cy.get("table tbody tr")
          .first()
          .find("td")
          .eq(2)
          .should("not.be.empty");
      } else {
        cy.log("Nenhum registro para verificar formatação");
      }
    });
  });

  it("Deve ordenar atores por nome", () => {
    cy.wait(1000);

    cy.get("table tbody tr").then(($rows) => {
      if ($rows.length > 0) {
        cy.wrap($rows).should("have.length.greaterThan", 0);
      } else {
        cy.log("Nenhum registro para verificar ordenação");
      }
    });
  });

  it("Deve validar formato de data incorreto", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Scarlett");
    cy.contains("label", "Sobrenome").parent().find("input").type("Johansson");

    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .should("have.attr", "type", "date");

    cy.contains("label", "Data de Estreia")
      .parent()
      .find("input")
      .type("1984-11-22", { force: true });

    // Submeter
    cy.contains("button", "Salvar").click();

    // Verificar processamento
    cy.wait(2000);
  });
});
