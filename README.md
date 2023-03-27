# Ecommerce_Application

We create Object which we pass through ORM Sequelize.
Sequelize uses these Objects and convert them into queries.
These Queries do the job required from them and returns us a Response.
Object which we pass are JSON type 
{ 
    "userName": "userName",
    "password": "password"
}
Sequelize convert them into MySql queries like select * from Internally.
Both Sequelize Library and your code runs at same machine, so object to conversion
happens using CPU, no Network Calling is required for this tasks.
 
