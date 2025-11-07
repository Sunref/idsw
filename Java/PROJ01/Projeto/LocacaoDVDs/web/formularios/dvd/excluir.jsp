<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Excluir DVD</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Excluir DVD</h1>

    <div>
      <h3>⚠️ Confirmação de Exclusão</h3>
      <p>Tem certeza que deseja excluir o DVD <strong>"${dvd.titulo}"</strong> (ID: ${dvd.id})?</p>
      
  <div class="content-wrapper narrow">
    <div class="table-auto">
      <table>
            <tbody>
              <tr>
                <th>Título</th>
                <td>${dvd.titulo}</td>
              </tr>
              <tr>
                <th>Ano</th>
                <td>${dvd.anoLancamento}</td>
              </tr>
              <tr>
                <th>Gênero</th>
                <td>${dvd.genero.descricao}</td>
              </tr>
              <tr>
                <th>Classificação</th>
                <td>${dvd.classificacaoEtaria.descricao}</td>
              </tr>
            </tbody>
            </table>
            </div>
      
        <p><strong>⚠️ Esta ação não pode ser desfeita!</strong></p>
      
        <form method="post" action="${cp}/processaDvd" class="form-actions">
          <input type="hidden" name="acao" value="excluir"/>
          <input type="hidden" name="id" value="${dvd.id}"/>
          <button type="submit" class="btn btn-danger icon-only" title="Confirmar Exclusão" aria-label="Confirmar Exclusão"><i
              class="bi bi-trash"></i></button>
          <a href="${cp}/processaDvd?acao=listar" class="btn btn-secondary"><i class="bi bi-x-lg"></i> Cancelar</a>
        </form>
      </div>
    </div>

  </body>

</html>