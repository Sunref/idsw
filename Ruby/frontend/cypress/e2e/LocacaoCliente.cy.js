describe("CRUD Cliente — criação", () => {
  it("Cadastra cliente com dados válidos", () => {
    visitaEntrar();
    visitaCadastrarCliente();

    cy.contains("tr", "Fernanda Martins").within(() => {
      cy.contains("444.444.444-44").should("exist");
      cy.contains("Vargem Grande do Sul").should("exist");

      cy.get("button:has(svg.lucide-trash2)")
        .should("have.length", 1)
        .click({ force: true });
    });

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Fernanda");
    cy.contains("label", "Sobrenome").parent().find("input").type("Martins");

    // Corrigido: calendário não quebra mais
    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("2003-08-22", { force: true });

    cy.contains("label", "CPF").parent().find("input").type("444.444.444-44");
    cy.contains("label", "E-mail")
      .parent()
      .find("input")
      .type("fernanda@test.com");
    cy.contains("label", "Logradouro").parent().find("input").type("Rua Teste");
    cy.contains("label", "Número").parent().find("input").type("100");
    cy.contains("label", "Bairro").parent().find("input").type("Centro");
    cy.contains("label", "CEP").parent().find("input").type("13880-000");

    // Abre
    cy.contains("label", "Cidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    // Garante que as opções surgiram
    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    }).should("be.visible");

    // Seleciona
    cy.contains('[role="option"]', "Vargem Grande do Sul").click({
      force: true,
    });

    // Aguarda o botão "Salvar" existir no DOM
    cy.contains("button", "Salvar")
      .should("exist")
      .then(($btn) => {
        // Log para verificar quantos botões correspondem ao seletor
        cy.log(`Encontrados: ${$btn.length} botões "Salvar"`);
      });

    // Aguarda ele estar visível e habilitado
    cy.contains("button", "Salvar")
      .should("be.visible")
      .should("not.be.disabled");

    // Tenta clicar normalmente
    cy.contains("button", "Salvar")
      .click()
      .then(() => {
        cy.log("Clique normal executado.");
      });

    cy.contains("Registro criado com sucesso.");
  });

  // Função de Entrar no sistema
  function visitaEntrar() {
    cy.visit("/");
    cy.contains("Entrar");
    cy.contains("button", "Entrar").click();
  }

  function visitaCadastrarCliente() {
    cy.contains("button", "Cliente").click();
  }
});
