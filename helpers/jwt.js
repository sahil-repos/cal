const expressJwt= require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms:['HS256'],
    }).unless({
        path:[
           // {url: /\/api\/v1\/meals(.*)/ , methods: ['GET','PUT'] },
            '/api/v1/users/login',
            '/api/v1/users/signup',
            
        ]
    })
}


module.exports=authJwt;