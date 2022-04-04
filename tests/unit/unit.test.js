const request =require( 'supertest');
const { app}= require('../../app');

//test variables
loggedInUser=[];
let token='';
addedMeal=[];


describe("Test Case for signup user with correct details ",()=>{
    test('For signUp. Should get 200 status',async ()=>{
        const response= await request(app).post("/api/v1/users/signup").send({
        name:'ut_user' ,
        email: 'ut_user',
        password:'ut_user',
        isAdmin:true
        })
        loggedInUser=JSON.parse(response.text);
        expect(response.statusCode).toBe(200)
        //expect(response.body);
    });
    
});
describe("Test Case for correct user login",()=>{

    test('should get 200',async ()=>{
        const response= await request(app).post("/api/v1/users/login").send({
            email:'ut_user',
            password:'ut_user'
        })
        token=JSON.parse(response.text).token;
        expect(response.statusCode).toBe(200);
    });

    test('For login. response content-type should be application/json',async ()=>{
        const response= await request(app).post("/api/v1/users/login").send({
            email:'ut_user',
            password:'ut_user'
        })
        token=JSON.parse(response.text).token;
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    });
});

describe("Test Case for Adding meal with authenticated user ",()=>{
    test('For Adding meal. Should get 200 status',async ()=>{
        const response= await request(app).post("/api/v1/meals/").send({
        name:'Pizza' ,
        email: loggedInUser.email,
        calories:25,
        created_at:"2022-02-21"
        }).set('Authorization', `Bearer ${token}`)
        addedMeal=JSON.parse(response.text);
        expect(response.statusCode).toBe(200)
        //expect(response.body);
    });
    
});


describe("Test Case for getting meals with wrong user ",()=>{
    test('For Adding meal. Should get 400 bad request status',async ()=>{
        const response= await request(app).get("/api/v1/meals/"+loggedInUser.id).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(400)
        //expect(response.body);
    });
    
});

describe("Test Case for getting meals with authenticated user ",()=>{
    test('For Adding meal. Should get 200 status',async ()=>{
        const response= await request(app).get("/api/v1/meals/"+loggedInUser.email).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        //expect(response.body);
    });
    
});

describe("Test Case for editing meal with authenticated user ",()=>{
    test('For Adding meal. Should get 200 status',async ()=>{
        const response= await request(app).put("/api/v1/meals/"+addedMeal.id).send({
        name:'Pasta' ,
        calories:251
        
        }).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    });
    
});



describe("Test Case for Adding meal with no authenticated user ",()=>{
    test('For Adding meal. Should get 401 status',async ()=>{
        const response= await request(app).post("/api/v1/meals/").send({
        name:'Pasta' ,
        email: loggedInUser.email,
        calories:25,
        created_at:"2022-02-21"
        })
       
        expect(response.statusCode).toBe(401)
    });
    
});

describe("Test Case for deleting a meal by authenticated user ",()=>{
    test('For deleting meal. Should get 200 status',async ()=>{
        const response= await request(app).delete("/api/v1/meals/"+addedMeal.id).set('Authorization', `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
    });
    
});

describe("Test Case for login with incorrect email",()=>{

    test('should get 404',async ()=>{
        const response= await request(app).post("/api/v1/users/login").send({
            email:'g6',
            password:'q'
        })
        expect(response.statusCode).toBe(404);
    });
});

describe("Test Case for login with invalid password",()=>{

    test('should get 400',async ()=>{
        const response= await request(app).post("/api/v1/users/login").send({
            email:'q',
            password:'qwrong'
        })
        expect(response.statusCode).toBe(400);
    });
});

describe("Test Case for unauthorized URL",()=>{

    test('should get 401',async ()=>{
        const response= await request(app).post("/api/v1/users").send({
            email:'g6',
            password:'q'
        })
        expect(response.statusCode).toBe(401);
    });
});

describe("Test Case for incorrect email",()=>{

    test('should get 200',async ()=>{
        const response= await request(app).post("/api/v1/users/login").send({
            email:'g6',
            password:'q'
        })
        expect(response.statusCode).toBe(404);
    });
});

describe("Test Case for unauthorized access to user",()=>{

    test('should get 401',async ()=>{
        const response= await request(app).get("/api/v1/users/622d21ab7c80737fcefb70ca")
        expect(response.statusCode).toBe(401);
    });
});


describe("Test Case for signup with exisiting email ",()=>{

    test('should get 400',async ()=>{
        const response= await request(app).post("/api/v1/users/signup").send({
        name:'Rino' ,
        email: loggedInUser.email,
        password:'q',
        })
        expect(response.statusCode).toBe(400);
    });
});


describe("Test Case for   delete user correctly  ",()=>{    
    test('For Deletion. Should get 200 status because no authorization',async ()=>{
        const response= await request(app).delete("/api/v1/users/"+ loggedInUser.id).set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(200);
    });
});

describe("Test Case for   delete user not available in system  ",()=>{    
    test('For Deletion. Should get 404 status because no authorization',async ()=>{
        const response= await request(app).delete("/api/v1/users/"+ loggedInUser.id).set('Authorization', `Bearer ${token}`)
        
        expect(response.statusCode).toBe(404);
    });
});










