describe("CRUD Cliente — criação", () => {
	it("Cadastra cliente com dados válidos", () => {

		visitaEntrar();
		visitaCadastrarCliente();

		cy.contains("button", "Novo registro").click();
		cy.contains("Nome").type("Fernanda");
		cy.contains("Sobrenome").type("Martins");
		cy.contains("Data de Nascimento").type("2003-08-22");
		cy.contains("CPF").type("444.444.444-44");
		cy.contains("Email").type("fernanda@test.com");
		cy.contains("Logradouro").type("Rua Teste");
		cy.contains("Número").type("100");
		cy.contains("Bairro").type("Centro");
		cy.contains("CEP").type("13880-000");
		cy.contains("Cidade").select("Vargem Grande do Sul");

		cy.contains("button", "Salvar").click();

		cy.contains("Cliente cadastrado com sucesso");
		cy.contains("Fernanda Martins");
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
