package locacao_dvds.servicos;

import locacao_dvds.dao.ClassificacaoEtariaDAO;
import locacao_dvds.entidades.ClassificacaoEtaria;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * 
 * Servlet para prover os serviços relacionados à entidade ClassificacaoEtaria.
 *
 * @author Fernanda , Gabriel M e Kevin D.
 * 
 */
@WebServlet( name = "ClassificacaoEtariaServices", 
             urlPatterns = { "/processaClassificacaoEtaria" } )
public class ClassificacaoEtariaServices extends HttpServlet {

    protected void processRequest( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        
        String acao = request.getParameter( "acao" );
        RequestDispatcher disp = null;

        try ( ClassificacaoEtariaDAO dao = new ClassificacaoEtariaDAO() ) {

            if ( acao != null && acao.equals( "listar" ) ) {

                List<ClassificacaoEtaria> classificacoesEtarias = dao.listarTodos();
                request.setAttribute( "classificacoesEtarias", classificacoesEtarias );
                disp = request.getRequestDispatcher( 
                        "/formularios/classificacaoEtaria/listagem.jsp" );

            } else if ( acao != null && acao.equals( "prepararNovo" ) ) {

                disp = request.getRequestDispatcher( 
                        "/formularios/classificacaoEtaria/novo.jsp" );

            } else if ( acao != null && acao.equals( "prepararAlteracao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                ClassificacaoEtaria classificacaoEtaria = dao.obterPorId( id );
                request.setAttribute( "classificacaoEtaria", classificacaoEtaria );
                disp = request.getRequestDispatcher( 
                        "/formularios/classificacaoEtaria/alteracao.jsp" );

            } else if ( acao != null && acao.equals( "prepararExclusao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                ClassificacaoEtaria classificacaoEtaria = dao.obterPorId( id );
                request.setAttribute( "classificacaoEtaria", classificacaoEtaria );
                disp = request.getRequestDispatcher( 
                        "/formularios/classificacaoEtaria/excluir.jsp" );

            } else if ( acao != null && acao.equals( "novo" ) ) {

                String descricao = request.getParameter( "descricao" );

                ClassificacaoEtaria ce = new ClassificacaoEtaria();
                ce.setDescricao( descricao );

                dao.salvar( ce );
                disp = request.getRequestDispatcher( 
                        "/processaClassificacaoEtaria?acao=listar" );

            } else if ( acao != null && acao.equals( "alterar" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                String descricao = request.getParameter( "descricao" );

                ClassificacaoEtaria ce = new ClassificacaoEtaria();
                ce.setId( id );
                ce.setDescricao( descricao );

                dao.atualizar( ce );
                disp = request.getRequestDispatcher( 
                        "/processaClassificacaoEtaria?acao=listar" );

            } else if ( acao != null && acao.equals( "excluir" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                ClassificacaoEtaria ce = new ClassificacaoEtaria();
                ce.setId( id );

                dao.excluir( ce );
                disp = request.getRequestDispatcher( 
                        "/processaClassificacaoEtaria?acao=listar" );

            } else {
                // Ação inválida
                List<ClassificacaoEtaria> classificacoesEtarias = dao.listarTodos();
                request.setAttribute( "classificacoesEtarias", classificacoesEtarias );
                disp = request.getRequestDispatcher( 
                        "/formularios/classificacaoEtaria/listagem.jsp" );
            }

        } catch ( SQLException exc ) {
            exc.printStackTrace();
            // Em caso de erro de SQL
            disp = request.getRequestDispatcher( "/formularios/classificacaoEtaria/listagem.jsp" );
        }

        if ( disp != null ) {
            disp.forward( request, response );
        }

    }

    @Override
    protected void doGet( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        processRequest( request, response );
    }

    @Override
    protected void doPost( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        processRequest( request, response );
    }

    @Override
    public String getServletInfo() {
        return "ClassificacaoEtariaServices";
    }

}