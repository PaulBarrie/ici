const create = 
`mutation{
    createSeller(seller: {name: "paul", email: "test13@test.fr", phone:"0771892239", password: "test" }) {
        email
    }
}`

const login = (identifier, password) => {
    return (
    `mutation{
        loginSeller(identifier: ${identifier}, password: ${password}) {
            uid
            role
            token
        }
    }`)
}
