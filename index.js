const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { connectDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

// Rotas principais da API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/shorten', require('./routes/shorten'));
app.use('/', require('./routes/redirect'));

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
