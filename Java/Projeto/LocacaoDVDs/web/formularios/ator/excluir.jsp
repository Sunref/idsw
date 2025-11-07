<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Excluir Ator</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Excluir Ator</h1>

  <div class="content-wrapper narrow">
    <h3><i class="bi bi-exclamation-triangle-fill text-warning"></i> Confirmação de Exclusão</h3>
      <p>Tem certeza que deseja excluir o seguinte ator?</p>

      <div>
        <table class="table-auto">
          <tr>
            <td><strong>Id:</strong></td>
            <td>${ator.id}</td>
          </tr>
          <tr>
            <td><strong>Nome:</strong></td>
            <td>${ator.nome}</td>
          </tr>
          <tr>
            <td><strong>Sobrenome:</strong></td>
            <td>${ator.sobrenome}</td>
          </tr>
          <tr>
            <td><strong>Data de Estreia:</strong></td>
            <td>
              <fmt:formatDate value="${ator.dataEstreia}" pattern="dd/MM/yyyy"/>
            </td>
          </tr>
        </table>
      </div>

      <p><strong class="text-danger">Esta ação não pode ser desfeita!</strong></p>

      <div class="form-actions">
        <form method="post" action="${cp}/processaAtor" style="display:inline;">
          <input type="hidden" name="acao" value="excluir"/>
          <input type="hidden" name="id" value="${ator.id}"/>
          <button type="submit" class="btn btn-danger icon-only" title="Confirmar Exclusão" aria-label="Confirmar Exclusão"><i
              class="bi bi-trash"></i></button>
        </form>
        <a href="${cp}/processaAtor?acao=listar" class="btn"><i class="bi bi-x-lg"></i> Cancelar</a>
      </div>
    </div>

  </body>

</html>