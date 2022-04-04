const express= require('express');
const app= express();
const mongoose= require('mongoose');
const morgan= require('morgan');
const cors = require('cors');
const authJwt=require('./helpers/jwt');
const errorHandler= require('./helpers/error-handler');

require('dotenv/config'); 

app.use(cors());
app.options('*', cors())


//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

//Routes
const mealRoutes = require('./routers/meal');

const usersRoutes = require('./routers/users');
const res = require('express/lib/response');

const api=process.env.API_URL;

app.use(`${api}/meals`,mealRoutes);
app.use(`${api}/users`,usersRoutes);








//http:localhost:3000/api/v1

//connect mong
mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    dbName:process.env.DB_NAME
})
.then(()=>{
    //console.log('DB conn ready');
})
.catch( (err)=>{
    console.log(err);
} );



//start sv
app.listen(3000,()=>{
   // console.log(api);
    //console.log('sv runnin on 3000');
});

module.exports={app}