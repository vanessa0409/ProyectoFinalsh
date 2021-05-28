const mysql = require('mysql');
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use (express.json());

app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));

//mysql
const connection = mysql.createConnection({
    host: 'freedb.tech',
    user: 'freedbtech_vanessaperalta',
    password: 'vanessaamelia04',
    database: 'freedbtech_CamelliaDB'
});

app.get('/index', (req, res) => res.render('pages/index'))
app.get('/contactos', (req, res) => res.render('pages/contactos'))
app.get('/login', (req, res) => res.render('pages/login'))

app.get('/customers', (req, res) => {

    const sql = 'SELECT * FROM Login';

    connection.query(sql, (error, results) => {
        if (error) throw error;

        res.render('pages/resultado', {
            'results': results
        });

    });

});

app.post('/add', (req, res) => {

    const sql = `SELECT * FROM Login WHERE Correo = '${req.body.correo}'`;
    connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {

            res.send('correo enviado');

        } else {

            const sql = 'INSERT INTO Login SET ?';

            const customerObj = {
                Nombre: req.body.nombres,
                Apellido: req.body.apellidos,
                Correo: req.body.correo
            }


            connection.query(sql, customerObj, error => {
                if (error) throw error;
                res.send("correo enviado");

            });
        }

    });




});

app.listen(port, () => console.log('server running'))

