/// <reference types="cypress" />
const Guid = require('guid')

describe('GET /:UserID', () => {
    const loginEndpoint = 'http://localhost:3000/api/user/1'
    it('gets a single user', () => {
        cy.request({
            method: 'GET',
            url: loginEndpoint
        })
            .then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body).to.have.property('email')
            })
    })
})
