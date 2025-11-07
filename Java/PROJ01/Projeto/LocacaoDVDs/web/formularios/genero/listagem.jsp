<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Gêneros</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Gêneros</h1>

    <div class="content-wrapper">
      <div class="header-action">
  <a href="${cp}/processaGenero?acao=prepararNovo" class="btn btn-primary icon-only" title="Novo Gênero"
    aria-label="Novo Gênero"><i class="bi bi-plus-lg"></i></a>
      </div>

      <table class="tabelaListagem">
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>

        <jsp:useBean 
            id="servicos" 
            scope="page" 
            class="locacao_dvds.servicos.GeneroServices"/>

        <c:forEach items="${generos}" var="genero">
          <tr>
            <td>${genero.id}</td>
            <td>${genero.descricao}</td>
            <td class="table-actions">
            <a href="${cp}/processaGenero?acao=prepararAlteracao&id=${genero.id}" class="icon-only"
              title="Alterar ${genero.descricao}" aria-label="Alterar ${genero.descricao}"><i class="bi bi-pencil"></i></a>
            <a href="${cp}/processaGenero?acao=prepararExclusao&id=${genero.id}" class="delete icon-only"
              title="Excluir ${genero.descricao}" aria-label="Excluir ${genero.descricao}"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </c:forEach>

      </tbody>

      </table>
    </div>

    <a href="${cp}/index.jsp" class="back-link">Tela Principal</a>
  <script src="style/table-utils.js"></script>

  </body>

</html>