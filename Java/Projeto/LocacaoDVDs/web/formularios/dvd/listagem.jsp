<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>DVDs</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>DVDs</h1>

    <div class="content-wrapper">
      <div class="header-action">
        <a href="${cp}/processaDvd?acao=prepararNovo" class="btn btn-primary icon-only" title="Novo DVD"
          aria-label="Novo DVD"><i class="bi bi-person-plus"></i></a>
      </div>

      <table class="tabelaListagem">
        <thead>
          <tr>
            <th>Id</th>
            <th>Título</th>
            <th>Ano</th>
            <th>Ator Principal</th>
            <th>Ator Coadjuvante</th>
            <th>Gênero</th>
            <th>Classificação</th>
            <th>Duração (min)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>

        <jsp:useBean 
            id="servicos" 
            scope="page" 
            class="locacao_dvds.servicos.DvdServices"/>

        <c:forEach items="${dvds}" var="dvd">
          <tr>
            <td>${dvd.id}</td>
            <td>
              <a href="${cp}/formularios/dvd/detalhesFilme.html?titulo=${dvd.titulo}" title="Ver detalhes de ${dvd.titulo}"
                style="text-decoration:underline; color:blue; cursor:pointer;">
                ${dvd.titulo}
              </a>
            </td>
            <td>${dvd.anoLancamento}</td>
            <td>${dvd.atorPrincipal.nome} ${dvd.atorPrincipal.sobrenome}</td>
            <td>${dvd.atorCoadjuvante.nome} ${dvd.atorCoadjuvante.sobrenome}</td>
            <td>${dvd.genero.descricao}</td>
            <td>${dvd.classificacaoEtaria.descricao}</td>
            <td>${dvd.duracaoMinutos}</td>
            <td class="table-actions">
              <a href="${cp}/processaDvd?acao=prepararAlteracao&id=${dvd.id}" class="icon-only" title="Alterar ${dvd.titulo}"
                aria-label="Alterar ${dvd.titulo}"><i class="bi bi-pencil"></i></a>
              <a href="${cp}/processaDvd?acao=prepararExclusao&id=${dvd.id}" class="delete icon-only" title="Excluir ${dvd.titulo}"
                aria-label="Excluir ${dvd.titulo}"><i class="bi bi-trash"></i></a>
            </td>
          </tr>
        </c:forEach>

      </tbody>

      </table>
    </div>

    <a href="${cp}/index.jsp" class="back-link">Tela Principal</a>

  </body>

</html>
<script src="style/table-utils.js"></script>