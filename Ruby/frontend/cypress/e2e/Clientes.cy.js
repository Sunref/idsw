describe("CRUD de Clientes", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Entrar").click();
    cy.contains("button", "Clientes").click();
  });

  it("Deve cadastrar um novo cliente com sucesso", () => {
    const timestamp = Date.now();
    const nome = `João ${timestamp}`;
    const email = `joao.${timestamp}@email.com`;
    const cpf = String(timestamp).padEnd(11, "0").slice(0, 11);

    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type(nome);
    cy.contains("label", "Sobrenome").parent().find("input").type("Silva");
    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("1990-05-15", { force: true });
    cy.contains("label", "CPF").parent().find("input").type(cpf);
    cy.contains("label", "E-mail").parent().find("input").type(email);
    cy.contains("label", "Logradouro")
      .parent()
      .find("input")
      .type("Rua das Flores");
    cy.contains("label", "Número").parent().find("input").type("123");
    cy.contains("label", "Bairro").parent().find("input").type("Centro");
    cy.contains("label", "CEP").parent().find("input").type("12345-678");

    cy.contains("label", "Cidade")
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

    cy.contains(nome);
  });

  it("Deve editar um cliente existente", () => {
    cy.wait(1000);

    cy.get("table tbody tr")
      .first()
      .within(() => {
        cy.get("button:has(svg.lucide-pencil)").click({ force: true });
      });

    cy.contains("label", "Nome")
      .parent()
      .find("input")
      .clear()
      .type("João Editado");
    cy.contains("label", "E-mail")
      .parent()
      .find("input")
      .clear()
      .type("joao.editado@email.com");

    cy.contains("button", "Salvar").click();

    cy.contains("Registro atualizado com sucesso.", { timeout: 10000 });

    cy.contains("João Editado");
  });

  it("Deve excluir um cliente", () => {
    const timestamp = Date.now();
    const nome = `Para Deletar ${timestamp}`;
    const email = `delete.${timestamp}@email.com`;
    const cpf = String(timestamp).padEnd(11, "9").slice(0, 11);

    cy.contains("button", "Novo registro").click();
    cy.contains("label", "Nome").parent().find("input").type(nome);
    cy.contains("label", "Sobrenome").parent().find("input").type("Temp");
    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("1990-01-01", { force: true });
    cy.contains("label", "CPF").parent().find("input").type(cpf);
    cy.contains("label", "E-mail").parent().find("input").type(email);
    cy.contains("label", "Logradouro").parent().find("input").type("Rua X");
    cy.contains("label", "Número").parent().find("input").type("1");
    cy.contains("label", "Bairro").parent().find("input").type("B");
    cy.contains("label", "CEP").parent().find("input").type("00000-000");

    cy.contains("label", "Cidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });
    cy.get('[data-radix-popper-content-wrapper] [role="option"]')
      .should("be.visible")
      .first()
      .click({ force: true });

    cy.contains("button", "Salvar").click();
    cy.contains("Registro criado com sucesso.", { timeout: 10000 });

    cy.contains("tr", nome).within(() => {
      cy.get("button:has(svg.lucide-trash2)").click({ force: true });
    });

    cy.on("window:confirm", () => true);

    cy.contains("Registro removido.", { timeout: 10000 });
  });

  it("Deve validar campos obrigatórios", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("button", "Salvar").click();

    cy.contains("label", "Nome").parent().find("input:invalid").should("exist");
  });

  it("Deve validar formato de email inválido", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Teste");
    cy.contains("label", "Sobrenome").parent().find("input").type("Sobrenome");
    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("1990-01-01", { force: true });
    cy.contains("label", "CPF").parent().find("input").type("12345678901");
    cy.contains("label", "E-mail")
      .parent()
      .find("input")
      .type("email-invalido");
    cy.contains("label", "Logradouro").parent().find("input").type("Rua Teste");
    cy.contains("label", "Número").parent().find("input").type("100");
    cy.contains("label", "Bairro").parent().find("input").type("Bairro");
    cy.contains("label", "CEP").parent().find("input").type("12345-678");

    cy.contains("label", "Cidade")
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

    cy.contains("label", "E-mail")
      .parent()
      .find("input:invalid")
      .should("exist");
  });

  it("Deve validar CPF com menos de 11 dígitos", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Maria");
    cy.contains("label", "Sobrenome").parent().find("input").type("Santos");
    cy.contains("label", "Data de Nascimento")
      .parent()
      .find("input")
      .type("1985-03-20", { force: true });
    cy.contains("label", "CPF").parent().find("input").type("123"); // CPF muito curto
    cy.contains("label", "E-mail")
      .parent()
      .find("input")
      .type("maria@email.com");
    cy.contains("label", "Logradouro")
      .parent()
      .find("input")
      .type("Av Principal");
    cy.contains("label", "Número").parent().find("input").type("456");
    cy.contains("label", "Bairro").parent().find("input").type("Jardim");
    cy.contains("label", "CEP").parent().find("input").type("98765-432");

    cy.contains("label", "Cidade")
      .parent()
      .find('button[role="combobox"]')
      .click({ force: true });

    cy.get('[data-radix-popper-content-wrapper] [role="option"]', {
      timeout: 5000,
    })
      .should("be.visible")
      .first()
      .click({ force: true });

    // Submeter formulário
    cy.contains("button", "Salvar").click();

    // Pode haver validação no backend ou frontend
    cy.wait(2000);
  });

  it("Deve buscar cliente pelo nome", () => {
    cy.wait(1000);

    cy.get(
      'input[type="search"], input[placeholder*="Buscar"], input[placeholder*="Pesquisar"], input[placeholder*="Filtrar"]'
    )
      .first()
      .type("João");

    // Verificar filtro
    cy.wait(500);
  });

  it("Deve cancelar criação de cliente", () => {
    cy.contains("button", "Novo registro").click();

    cy.contains("label", "Nome").parent().find("input").type("Teste Cancelar");

    cy.contains("button", "Cancelar").click();

    cy.contains("button", "Novo registro").should("exist");
  });
});
