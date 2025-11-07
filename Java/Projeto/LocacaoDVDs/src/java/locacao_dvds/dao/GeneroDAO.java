package locacao_dvds.dao;

import locacao_dvds.entidades.Genero;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * 
 * DAO para a entidade Genero.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public class GeneroDAO extends DAO<Genero> implements AutoCloseable{

    public GeneroDAO() throws SQLException {
    }

    @Override
    public void salvar( Genero obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                INSERT INTO  
                genero( 
                    descricao )  
                VALUES( ? );
                """ );

        stmt.setString( 1, obj.getDescricao() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public void atualizar( Genero obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                UPDATE genero  
                SET 
                    descricao = ?  
                WHERE 
                    id = ?;
                """ );

        stmt.setString( 1, obj.getDescricao() );
        stmt.setInt( 2, obj.getId() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public void excluir( Genero obj ) throws SQLException {

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                DELETE FROM genero  
                WHERE 
                    id = ?;
                """ );

        stmt.setInt( 1, obj.getId() );

        stmt.executeUpdate();
        stmt.close();

    }

    @Override
    public List<Genero> listarTodos() throws SQLException {

        List<Genero> lista = new ArrayList<>();

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                SELECT 
                    id,  
                    descricao  
                FROM 
                    genero  
                ORDER BY descricao;
                """ );

        ResultSet rs = stmt.executeQuery();

        while ( rs.next() ) {

            Genero g = new Genero();

            g.setId( rs.getInt( "id" ) );
            g.setDescricao( rs.getString( "descricao" ) );

            lista.add( g );

        }

        rs.close();
        stmt.close();

        return lista;

    }

    @Override
    public Genero obterPorId( int id ) throws SQLException {

        Genero genero = null;

        PreparedStatement stmt = getConnection().prepareStatement(
                """
                SELECT
                    id, 
                    descricao 
                FROM
                    genero 
                WHERE
                    id = ?;
                """ );

        stmt.setInt( 1, id );

        ResultSet rs = stmt.executeQuery();

        if ( rs.next() ) {

            genero = new Genero();

            genero.setId( rs.getInt( "id" ) );
            genero.setDescricao( rs.getString( "descricao" ) );

        }

        rs.close();
        stmt.close();

        return genero;

    }
    
    @Override
    public void close() throws SQLException {
        if (getConnection() != null && !getConnection().isClosed()) {
            getConnection().close();
        }
    }

}