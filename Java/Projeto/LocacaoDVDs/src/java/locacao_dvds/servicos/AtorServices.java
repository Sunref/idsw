package locacao_dvds.servicos;

import locacao_dvds.dao.AtorDAO;
import locacao_dvds.entidades.Ator;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

/**
 * 
 * Servlet para prover os serviços relacionados à entidade Ator.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
@WebServlet( name = "AtorServices", 
             urlPatterns = { "/processaAtor" } )
public class AtorServices extends HttpServlet {

    protected void processRequest( 
            HttpServletRequest request, 
            HttpServletResponse response )
            throws ServletException, IOException {
        
        String acao = request.getParameter( "acao" );
        RequestDispatcher disp = null;

        try ( AtorDAO dao = new AtorDAO() ) {

            if ( acao != null && acao.equals( "listar" ) ) {

                List<Ator> atores = dao.listarTodos();
                request.setAttribute( "atores", atores );
                disp = request.getRequestDispatcher( 
                        "/formularios/ator/listagem.jsp" );

            } else if ( acao != null && acao.equals( "prepararNovo" ) ) {

                disp = request.getRequestDispatcher( 
                        "/formularios/ator/novo.jsp" );

            } else if ( acao != null && acao.equals( "prepararAlteracao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                Ator ator = dao.obterPorId( id );
                request.setAttribute( "ator", ator );
                disp = request.getRequestDispatcher( 
                        "/formularios/ator/alteracao.jsp" );

            } else if ( acao != null && acao.equals( "prepararExclusao" ) ) {

                int id = Integer.parseInt(request.getParameter( "id" ));
                Ator ator = dao.obterPorId( id );
                request.setAttribute( "ator", ator );
                disp = request.getRequestDispatcher( 
                        "/formularios/ator/excluir.jsp" );

            } else if ( acao != null && acao.equals( "novo" ) ) {

                String nome = request.getParameter( "nome" );
                String sobrenome = request.getParameter( "sobrenome" );
                String dataEstreia = request.getParameter( "dataEstreia" );

                Ator a = new Ator();
                a.setNome( nome );
                a.setSobrenome( sobrenome );
                a.setDataEstreia( Date.valueOf( dataEstreia ) );

                dao.salvar( a );
                disp = request.getRequestDispatcher( 
                        "/processaAtor?acao=listar" );

            } else if ( acao != null && acao.equals( "alterar" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                String nome = request.getParameter( "nome" );
                String sobrenome = request.getParameter( "sobrenome" );
                String dataEstreia = request.getParameter( "dataEstreia" );

                Ator a = new Ator();
                a.setId( id );
                a.setNome( nome );
                a.setSobrenome( sobrenome );
                a.setDataEstreia( Date.valueOf( dataEstreia ) );

                dao.atualizar( a );
                disp = request.getRequestDispatcher( 
                        "/processaAtor?acao=listar" );

            } else if ( acao != null && acao.equals( "excluir" ) ) {

                int id = Integer.parseInt( request.getParameter( "id" ) );
                Ator a = new Ator();
                a.setId( id );

                dao.excluir( a );
                disp = request.getRequestDispatcher( 
                        "/processaAtor?acao=listar" );

            } else {
                // Ação inválida
                List<Ator> atores = dao.listarTodos();
                request.setAttribute( "atores", atores );
                disp = request.getRequestDispatcher( 
                        "/formularios/ator/listagem.jsp" );
            }

        } catch ( SQLException exc ) {
            exc.printStackTrace();
            // Em caso de erro de SQL
            disp = request.getRequestDispatcher( "/formularios/ator/listagem.jsp" );
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
        return "AtorServices";
    }

}