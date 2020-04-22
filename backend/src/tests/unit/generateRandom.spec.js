const generateRandom = require('../../util/generateRandom');

describe('GenerateRandom', () => {
    it('should be able to generate a id', async() =>{
        const id = generateRandom.makeId(5);
        
        expect(id).toHaveLength(5);        
    });

    it('should be able to generate a email', async() =>{
        const email = generateRandom.makeEmail();
        
        expect(email).toHaveLength(15);        
    });
    
    it('should be able to generate a user', async() =>{
        const user = generateRandom.makeUser();
        
        expect(user).toHaveLength(14);        
    });
});