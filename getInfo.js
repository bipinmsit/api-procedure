const config = require("./dbConfig");
const sql = require("mssql");

// Simply get data from query
const executeTable = async () => {
  try {
    let pool = await sql.connect(config);
    let output = await pool.request().query("select * from arinc.AIRFIELD;");

    return output.recordsets;
  } catch (e) {
    console.error("Something went wrong", e);
  }
};

// Execute query with some condition
const executeTableByID = async (id) => {
  try {
    let pool = await sql.connect(config);
    let output = await pool
      .request()
      .input("input_parameter", sql.Int, id)
      .query("SELECT * FROM arinc.AIRFIELD WHERE AIRFIELDID=@input_parameter;");

    return output.recordsets;
  } catch (e) {
    console.error("Something went wrong", e);
  }
};

// Insert data to database by using query
const addOrderByQuery = async (order) => {
  try {
    let pool = await sql.connect(config);
    let insertProduct = await pool
      .request()
      .input("Id", sql.Int, order.Id)
      .input("Title", sql.NVarChar, order.Title)
      .input("Quantity", sql.Int, order.Quantity)
      .input("Message", sql.NVarChar, order.Message)
      .input("City", sql.NVarChar, order.City)
      .query(
        `INSERT INTO table_name (Id, Title, Quantity, Message, City) VALUES (${order.Id}, ${order.Title}, ${order.Quantity}, ${order.Message},${order.City});`
      );

    return insertProduct.recordsets;
  } catch (e) {
    console.error("Something went wrong", e);
  }
};

// Insert data to database by using procedure
const addOrderByProcedure = async (order, procedureName) => {
  try {
    let pool = await sql.connect(config);
    let insertProduct = await pool
      .request()
      .input("Id", sql.Int, order.Id)
      .input("Title", sql.NVarChar, order.Title)
      .input("Quantity", sql.Int, order.Quantity)
      .input("Message", sql.NVarChar, order.Message)
      .input("City", sql.NVarChar, order.City)
      .execute(procedureName);

    return insertProduct.recordsets;
  } catch (e) {
    console.error("Something went wrong", e);
  }
};

// Get data from procedure
async function getDataFromProcedure(procedureName) {
  try {
    let pool = await sql.connect(config);

    let result = await pool
      .request()
      .input("ConditionalOperator", sql.Int, 1)
      .execute(procedureName);

    console.log(result.recordsets[0]);

    return result.recordsets[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  executeTable: executeTable,
  executeTableByID: executeTableByID,
  getDataFromProcedure: getDataFromProcedure,
  addOrderByProcedure: addOrderByProcedure,
};
