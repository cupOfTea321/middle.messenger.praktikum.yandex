import esmock from 'esmock';
import sinon from 'sinon';
import { describe, before, it } from 'mocha';


describe('AuthController', () => {
    let mockAuth: any;
    const signinFake =  sinon.fake();

    before(async ()=>{

        const {api: myAuthController} = await esmock('./AuthController.ts', {
            '../api/AuthAPI.ts': {
                signin: signinFake
            }
        })

        mockAuth = myAuthController;
    })
   it('signin() must check user argument data',  ()=>{
       const testData = { login: 'testUser', password: 'testPassword' };
       mockAuth.signin(testData);

       sinon.assert.calledWithExactly(mockAuth.signin, testData);
   })
});
