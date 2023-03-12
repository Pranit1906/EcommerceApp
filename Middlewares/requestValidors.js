 exports.validateCategoryRequests = (req, res, next) => {
     if (!req.body) {
         return res.status(400).send({
             message: "Request Body Can't Be Empty!"
         })
     }

     if (!req.body.name) {
         return res.status(400).send({
             message: 'Name is Required!'
         })
     }
     next();
 }


 exports.validateProductRequests = (req, res, next) => {
     if (!req.body) {
         return res.status(400).send({
             message: "Request Body Can't Be Empty!"
         })
     }

     if (!req.body.name) {
         return res.status(400).send({
             message: 'Name is Required!'
         })
     }

     if (!req.body.categoryId) {
         return res.status(400).send({
             message: 'CategoryId is Required!'
         })
     }

     if (typeof req.body.categoryId !== 'number') {
         return res.status(400).send({
             message: ' Invalid CategoryId'
         })
     }
     next();
 }