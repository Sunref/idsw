<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Excluir Gênero</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Excluir Gênero</h1>

  <div class="content-wrapper narrow">
      <h3>⚠️ Confirmação de Exclusão</h3>
      <p>Tem certeza que deseja excluir o gênero <strong>"${genero.descricao}"</strong> (ID: ${genero.id})?</p>

      <div class="table-auto">
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <td>${genero.id}</td>
            </tr>
            <tr>
              <th>Descrição</th>
              <td>${genero.descricao}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>⚠️ Esta ação não pode ser desfeita!</strong></p>

      <form method="post" action="${cp}/processaGenero" class="form-actions">
        <input type="hidden" name="acao" value="excluir" />
        <input type="hidden" name="id" value="${genero.id}" />
  <button type="submit" class="btn btn-danger icon-only" title="Confirmar Exclusão" aria-label="Confirmar Exclusão"><i
      class="bi bi-trash"></i></button>
  <a href="${cp}/processaGenero?acao=listar" class="btn btn-secondary"><i class="bi bi-x-lg"></i> Cancelar</a>
  </form>
    </div>

  </body>

</html>