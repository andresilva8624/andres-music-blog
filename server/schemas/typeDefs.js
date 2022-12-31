const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID
		username: String
		email: String
		isAdmin: Boolean
		savedLesson: [Lesson]
	}
	type Reaction {
		title: String
        description: String
        tabsURL: String
        videoURL: String
	}
	type Thought {
		thoughtText: String
        description: String
        tabsURL: String
        videoURL: String
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
		saveLesson(title: String!,description: String!,tabsURL: String!,videoURL: String!): Lesson
		removeLesson(title: String!,description: String!,tabsURL: String!,videoURL: String!): Lesson
		addReaction(title: String!,description: String!,tabsURL: String!,videoURL: String!): Reaction
		addThought(title: String!,description: String!,tabsURL: String!,videoURL: String!): Thought
	}
`;

module.exports = typeDefs;
