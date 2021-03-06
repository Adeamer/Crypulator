const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String
        email: String
        currency: [Currency]
    }

    type Auth {
        token: ID
        user: User
    }

    type Currency {
        _id: ID!
        currencyType: String
        purchasedAmount: String
        soldAmount: String
        dateOfTransaction: Date
        yearlyIncome: String
        costOwning: String
        timeOfOwnership: Boolean
    }
    
    scalar Date

    type MyType {
        created: Date
    }

    type Query {
        user: User
        currency: [Currency]
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!): User
        addCurrency(currencyType: String!, purchasedAmount: String!, soldAmount: String!, dateOfTransaction: Date!, yearlyIncome: String!, timeOfOwnership: Boolean!): Currency
        removeCurrency(currencyId: ID!): User
        updateUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
    }
`

module.exports = typeDefs;