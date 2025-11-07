package locacao_dvds.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * 
 * Uma fábrica de conexões.
 *
 * @author Fernanda M, Gabriel M e Kevin D.
 * 
 */
public class ConnectionFactory {

    /**
     * O método getConnection retorna uma conexão com a base de dados
     * locacao_dvds.
     *
     * @return Uma conexão com o banco de dados locacao_dvds.
     * @throws SQLException Caso ocorra algum problema durante a conexão.
     */
    public static Connection getConnection() throws SQLException {
        // URL JDBC do MariaDB
        String url = "jdbc:mariadb://localhost:3306/locacao_dvds";
        String usuario = "root";
        String senha = "";

        return DriverManager.getConnection(url, usuario, senha);
    }

}
