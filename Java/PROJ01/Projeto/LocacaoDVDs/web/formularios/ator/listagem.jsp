<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Atores</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Atores</h1>

    <div class="content-wrapper">
        <div class="header-action">
            <a href="${cp}/processaAtor?acao=prepararNovo" class="btn btn-primary icon-only" title="Novo Ator"
                aria-label="Novo Ator"><i class="bi bi-person-plus"></i></a>
        </div>

        <table class="tabelaListagem">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Data de Estreia</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>

                <jsp:useBean 
                    id="servicos" 
                    scope="page" 
                    class="locacao_dvds.servicos.AtorServices"/>

                <c:forEach items="${atores}" var="ator">
                    <tr>
                        <td>${ator.id}</td>
                        <td>${ator.nome}</td>
                        <td>${ator.sobrenome}</td>
                        <td>
                            <fmt:formatDate value="${ator.dataEstreia}" pattern="dd/MM/yyyy"/>
                        </td>
                        <td class="table-actions">
                            <a href="${cp}/processaAtor?acao=prepararAlteracao&id=${ator.id}" class="icon-only"
                                title="Alterar ${ator.nome} ${ator.sobrenome}" aria-label="Alterar ${ator.nome} ${ator.sobrenome}"><i
                                    class="bi bi-pencil"></i></a>
                            <a href="${cp}/processaAtor?acao=prepararExclusao&id=${ator.id}" class="delete icon-only"
                                title="Excluir ${ator.nome} ${ator.sobrenome}" aria-label="Excluir ${ator.nome} ${ator.sobrenome}"><i
                                    class="bi bi-trash"></i></a>
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