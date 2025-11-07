<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="cp" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html>

<html>
  <head>
    <title>Excluir Classificação Etária</title>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/main.css">

  </head>

  <body>

    <h1>Excluir Classificação Etária</h1>

  <div class="content-wrapper narrow">
      <h3>⚠️ Confirmação de Exclusão</h3>
      <p>Tem certeza que deseja excluir a classificação <strong>"${classificacaoEtaria.descricao}"</strong> (ID:
        ${classificacaoEtaria.id})?</p>

      <div class="table-auto">
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <td>${classificacaoEtaria.id}</td>
            </tr>
            <tr>
              <th>Descrição</th>
              <td>${classificacaoEtaria.descricao}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p><strong>⚠️ Esta ação não pode ser desfeita!</strong></p>

      <form method="post" action="${cp}/processaClassificacaoEtaria" class="form-actions">
        <input type="hidden" name="acao" value="excluir" />
        <input type="hidden" name="id" value="${classificacaoEtaria.id}" />
  <button type="submit" class="btn btn-danger icon-only" title="Confirmar Exclusão" aria-label="Confirmar Exclusão"><i
      class="bi bi-trash"></i></button>
  <a href="${cp}/processaClassificacaoEtaria?acao=listar" class="btn btn-secondary"><i class="bi bi-x-lg"></i>
    Cancelar</a>
  </form>
    </div>

  </body>

</html>