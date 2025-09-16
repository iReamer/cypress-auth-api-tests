/// <reference types="cypress" />
const Guid = require('guid')

describe('/user/register', () => {
    const registerEndpoint = 'http://localhost:3000/api/user/register'
    it('return 200 /register creates user with valid body', () => {
        let dynamicEmail = Guid.raw() + '@test.de'
        let body = {
            name: 'TestName',
            email: dynamicEmail,
            password: 'TestPassword'
        }
        cy.request('POST', registerEndpoint, body)
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.name).to.eq('TestName');
                expect(response.body.email).to.eq(dynamicEmail);
                expect(response.body.password).to.not.eq('TestPassword');
            })
    })

    it('returns 500 when with no body', () => {
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(500)
            })
    })
    it('returns 400 doesnt allow user creation with bad user body', () => {
        let badBody = {
            name: '1',
            email: 'testtes',
            password: '123'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badBody
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                // expect(response.body.name).to.eq('TestName');

            })
    })

    it('returns 400 doesnt allow user creation with invalid email', () => {
        let badBody = {
            name: 'Valid',
            email: 'invalid',
            password: 'ValidPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badBody
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('"email" must be a valid email');
            })
    })
    it('returns 400 doesnt allow user creation with already used email', () => {
        let badBody = {
            name: 'Valid',
            email: 'test@test.de',
            password: 'ValidPassword'
        }
        cy.request({
            method: 'POST',
            url: registerEndpoint,
            failOnStatusCode: false,
            body: badBody
        })
            .then((response) => {
                expect(response.status).to.eq(400);
                expect(response.body).to.eq('User with this E-Mail already exists');

            })
    })

})
