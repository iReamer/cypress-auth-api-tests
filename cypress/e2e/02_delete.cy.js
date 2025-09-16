/// <reference types="cypress" />
const Guid = require('guid')

describe('Delete /:UserID', () => {
    const loginEndpoint = 'http://localhost:3000/api/user/1'
    it('Deletes a single user', () => {
        cy.request({
            method: 'DELETE',
            url: loginEndpoint
        })
            .then((response) => {
                expect(response.status).to.eq(204);
            })
    })
})
