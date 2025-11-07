<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Classificações Etárias</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Classificações Etárias</h1>

    <div class="content-wrapper">
      <div class="header-action">
  <a href="${cp}/processaClassificacaoEtaria?acao=prepararNovo" class="btn btn-primary icon-only"
    title="Nova Classificação Etária" aria-label="Nova Classificação Etária"><i class="bi bi-plus-lg"></i></a>
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
            class="locacao_dvds.servicos.ClassificacaoEtariaServices"/>

        <c:forEach items="${classificacoesEtarias}" var="classificacao">
          <tr>
            <td>${classificacao.id}</td>
            <td>${classificacao.descricao}</td>
            <td class="table-actions">
            <a href="${cp}/processaClassificacaoEtaria?acao=prepararAlteracao&id=${classificacao.id}" class="icon-only"
              title="Alterar ${classificacao.descricao}" aria-label="Alterar ${classificacao.descricao}"><i
                class="bi bi-pencil"></i></a>
            <a href="${cp}/processaClassificacaoEtaria?acao=prepararExclusao&id=${classificacao.id}" class="delete icon-only"
              title="Excluir ${classificacao.descricao}" aria-label="Excluir ${classificacao.descricao}"><i
                class="bi bi-trash"></i></a>
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