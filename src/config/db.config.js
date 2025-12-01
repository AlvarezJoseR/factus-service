import mysql from "mysql2/promise";
let pool = null;

const DbConfig = {
  async inicializar(config) {
    console.log('Config: ', config);
    try {
      pool = mysql.createPool(config);
      const connection = await pool.getConnection();
      await connection.ping(); // Verifica que haya respuesta
      connection.release();

      console.info("✅ Conexión a la base de datos verificada exitosamente.");
      return {
        status: true,
        message: "Conexión a la base de datos inicializada correctamente.",
      };
    } catch (error) {
      console.error(
        "Error al inicializar la conexión a la base de datos:1 ",
        error
      );
      return {
        status: false,
        message: "Error al inicializar la conexión a la base de datos.",
      };
    }
  },
  async exacuteQuery(query, params = []) {
    try {
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      console.error("Error executing query: ", error);
      throw error;
    }
  },
};

export default DbConfig;
