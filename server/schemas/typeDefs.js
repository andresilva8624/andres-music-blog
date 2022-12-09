const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		isAdmin: Boolean
		savedLesson: [Lesson]
	}

	type Lesson {
		title: String
        description: String
        tabsURL: String
        videoURL: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		users: [User]
		me: User
	}

	type Mutation {
		login(email: String!, password: String!): Auth
		addUser(username: String!, email: String!, password: String!): Auth
		addLesson(title: String!,description: String!,tabsURL: String!,videoURL: String!): Lesson
	}
`;

module.exports = typeDefs;
