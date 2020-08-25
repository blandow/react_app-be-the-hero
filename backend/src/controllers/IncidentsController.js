const conection = require('../database/conection');


module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.header.authorization;
        const [id] = await conection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({ id });
    },

    async index(request, response) {
        const [count] = await conection('incidents').count();

        const { page = 1 } = request.query;

        const incidents = await conection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*','ongs.name','ongs.email','ongs.watsapp','ongs.city','ongs.uf'])
            
            

        response.header('X-Total-Count', count['count(*)'])

        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.header.authorization;

        const incidents = conection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incidents.ong_id !== ong_id) {
            return response.status(401).json({ error: 'operation not permitted.' })
        }

        await conection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
}