/// <reference types="cypress" />
const Guid = require('guid')

describe('/user/login', () => {
    const loginEndpoint = 'http://localhost:3000/api/user/login'
    it('log in with valid user', () => {
        let staticTestUser = {
            email: 'Static-mail@test.de',
            password: 'ValidPassword'
        }
        cy.request({
            method: 'POST',
            url: loginEndpoint,
            body: staticTestUser
        })
            .then((response) => {
                expect(response.status).to.eq(200);
            })
    })
})
