const conection = require('../database/conection');
module.exports = {
    async create (request, response){
        const {id} = request.body;

        const ong = await conection('ongs')
        .with('id',id)
        .select('name')
        .first();
        if(!ong){
            return response.status(400).json({error:'No ONG`s found with this ID'})
        }
        return response.json(ong);
    }
}