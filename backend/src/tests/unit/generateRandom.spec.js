const generateRandom = require('../../util/generateRandom');

describe('GenerateRandom', () => {
    it('should be able to generate a email', async() =>{
        const email = generateRandom.makeEmail();
        
        expect(email).toHaveLength(15);        
    });
});