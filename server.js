// server.js
const express = require('express');
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
const { handleRecord } = require('./helpers/RecordHandler');
const AdminRoutes = require('./routes/AdminServices.js');
const ConfigRoutes = require('./routes/ConfigServ.js');

const app = express();

// Setup Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Enable CORS
app.use(cors());

// Enable JSON body parsing
app.use(express.json());

//#region HomeScreen
/**
 * @swagger
 * /getSubCategories:
 *   get:
 *     summary: Retrieve subcategories
 *     parameters:
 *       - in: query
 *         name: CategoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/getSubCategories', (req, res) => {
    const { CategoryId } = req.query;
    const data = { "CategoryId": CategoryId };
    handleRecord(req, res, data, OperationEnums().SUBCAGETS);
});
//#endregion HomeScreen

// Setup routes
app.use('/Admin', AdminRoutes);
app.use('/Home', ConfigRoutes);

// Start the server
const PORT = 3008;
app.listen(PORT, '192.168.1.7', () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
const port = process.env.PORT || 3009;
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});*/