const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const mongoose = require('mongoose');
const Work = require('./models/model');
const mysql = require('mysql')
const PORT = process.env.PORT || 2500;

const MONGODBURL = `mongodb+srv://kartikdhumal:guddupandit2023@cluster0.0enebyg.mongodb.net/crudall?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(MONGODBURL, {
}).then(() => {
    console.log('Connected MongoDB');
}).catch((error) => {
    console.error('Error', error);
})

const connection = mysql.createConnection({
        host:"localhost",
        user: 'root',
        password:"",
        database: 'crudall'
});

connection.connect((err) => {
    if(err){
        console.error('Error connect MySQL' , err);
        return;
    }
    console.error('MYSQL connected');
})

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})


app.get('/works', async (req, res) => {
    try {
        const works = await Work.find();
        res.json({works});
    }
    catch (err) {
        res.status(500).json('Error' + err);
    }
})

app.get('/work/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const works = await Work.findById(id);
        res.json({works});
    }
    catch (err) {
        res.status(500).json('Error' + err);
    }
})

app.post('/addwork', async (req, res) => {
    try {
        const work = req.body.work;
        const sendData = new Work({work : work});
        const done = sendData.save();
        res.json({message : 'Added work' , data : done});
    }
    catch (err) {
        res.status(500).json('Error' + err);
    }
})

app.put('/updatework/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const work = req.body;
        await Work.findByIdAndUpdate({_id: id},work,{new:true});
        res.json('Updated Successfully');   
    }
    catch (err) {
        res.status(500).json('Error' + err);
    }
})

app.delete('/deletework/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Work.findByIdAndDelete({ _id: id });
        res.json({ message: 'Deleted Successfully'});
    }
    catch (err) {
        res.status(500).json('Error' + err);
    }
})

app.get('/workssql', async (req, res) => {
    const query = "select * from works";
    connection.query(query,(err,results)=>{
        if(err){
            console.error('Error fetching works:', err);
            res.status(500).json({ error: 'Error fetching works' });
        }
        res.json(results);
    })
})

app.get('/worksql/:id', async (req, res) => {
    const id = req.params.id;
    const query = `select work from works where id = ${id}`;
    connection.query(query,(err,results)=>{
        if(err){
            console.error('Error fetching works:', err);
            res.status(500).json({ error: 'Error fetching works' });
        }
        res.json(results);
    })
})

app.put('/updateworksql/:id', async (req, res) => {
    const id = req.params.id;
    const { work } = req.body;
    const query = `update works set work = '${work}' where id = ${id}`;
    connection.query(query,(err,results)=>{
        if(err){
            console.error('Error updating works:', err);
            res.status(500).json({ error: 'Error updating works' });
        }
        res.json(results);
    })
})

app.post('/addworksql', async (req, res) => {
    const { work } = req.body;
    const query = `INSERT INTO works (work) VALUES ('${work}')`;
    connection.query(query,(err,results)=>{
        if(err){
            console.error('Error adding works:', err);
            res.status(500).json({ error: 'Error adding works' });
        }
        res.json({ message: 'Work added successfully',data : results});
    })
})

app.delete('/deleteworkssql/:id', async (req, res) => {
    const id = req.params.id;
    const query = `delete from works where id = ${id}`;
    connection.query(query,(err,results)=>{
        if(err){
            console.error('Error deleting works:', err);
            res.status(500).json({ error: 'Error deleting works' });
        }
        res.json(results);
    })
})