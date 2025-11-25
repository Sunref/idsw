describe("CRUD Cliente — criação", () => {
  it("Cadastra cliente com dados válidos", () => {
    visitaEntrar();
    visitaCadastrarCliente();

    const timestamp = Date.now();
    const nome = `Fernanda ${timestamp}`;
    const email = `fernanda.${timestamp}@test.com`;
    const cpf = String(timestamp).padEnd(11, "4").slice(0, 11);

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type(nome);
    cy.contains("label", "Sobrenome").parent().find("input").type("Martins");

    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("2003-08-22", { force: true });

    cy.contains("label", "CPF").parent().find("input").type(cpf);
    cy.contains("label", "E-mail").parent().find("input").type(email);
    cy.contains("label", "Logradouro").parent().find("input").type("Rua Teste");
    cy.contains("label", "Número").parent().find("input").type("100");
    cy.contains("label", "Bairro").parent().find("input").type("Centro");
    cy.contains("label", "CEP").parent().find("input").type("13880-000");

    cy.contains("label", "Cidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    }).should("be.visible");

    cy.contains('[role="option"]', "Vargem Grande do Sul").click({
      force: true,
    });

    cy.contains("button", "Salvar")
      .should("exist")
      .then(($btn) => {
          // Removed log statement
        cy.log(`Encontrados: ${$btn.length} botões "Salvar"`);
      });

    cy.contains("button", "Salvar")
      .should("be.visible")
      .should("not.be.disabled");

    cy.contains("button", "Salvar")
      .click()
      .then(() => {
          // Removed log statement
      });

    cy.contains("Registro criado com sucesso.");
  });

  function visitaEntrar() {
    cy.visit("/");
    cy.contains("Entrar");
    cy.contains("button", "Entrar").click();
  }

  function visitaCadastrarCliente() {
    cy.contains("button", "Cliente").click();
  }
});
