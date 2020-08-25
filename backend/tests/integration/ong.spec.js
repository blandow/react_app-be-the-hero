const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/conection');
describe('ONG',()=>{
    beforeEach(()=>{
        await connection.migrate.latest();
    });
    afterAll(async()=>{
        await connection.destroy();
    });
    it('should be able to create a new ONG',()=>{
        
        const response = await request(app)
        .post()
        .send({
            name:'FELONG',
            email:'felong@ong.com',
            whatsapp:'99999999999',
            city:'JAMBORIBAL',
            uf:'SP'

        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
})