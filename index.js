const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://bvmjjoqiwxujlvbmyyfo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2bWpqb3Fpd3h1amx2Ym15eWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMTcyNjAsImV4cCI6MjAxNjc5MzI2MH0.5iUIi0DvRXmkj1Yx41GDoapdHi2Dnz1J0CKYR0AAzMc'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/INST377-Week10-PPT.html', { root: __dirname })
})

app.get('/customers', async (req, res) => {
    console.log(`Getting Customer`)

    const {data, error} = await supabase
        .from('Customer')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})

app.post('/customer', async (req, res) => {
    console.log('Adding Customer')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customer')
        .insert([
            {'cust_first_name': firstName, 'cust_last_name': lastName, 'cust_state': state}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})