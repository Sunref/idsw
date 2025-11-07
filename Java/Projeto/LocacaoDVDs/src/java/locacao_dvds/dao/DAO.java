package locacao_dvds.dao;

import locacao_dvds.jdbc.ConnectionFactory;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * 
 * DAO genérico.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public abstract class DAO<Tipo> {

    private Connection conexao;

    public DAO() throws SQLException {
        conexao = ConnectionFactory.getConnection();
    }

    public Connection getConnection() {
        return conexao;
    }

    public void fecharConexao() throws SQLException {
        conexao.close();
    }

    public abstract void salvar( Tipo obj ) throws SQLException;

    public abstract void atualizar( Tipo obj ) throws SQLException;

    public abstract void excluir( Tipo obj ) throws SQLException;

    public abstract List<Tipo> listarTodos() throws SQLException;

    public abstract Tipo obterPorId( int id ) throws SQLException;

}