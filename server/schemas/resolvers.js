const { AuthenticationError } = require('apollo-server-express');
const { User, Lesson, Reaction, Thought } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return await User.find({}).select('-password');
		},
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

				return userData;
			}

			throw new AuthenticationError('Not logged in');
		}
	},

	Mutation: {
		addUser: async (_, args) => {
			const user = await User.create(args);
			const token = signToken(user);
			
			return { token, user };
		},
		addLesson: async (_, args, context) => {
			if (context.user.isAdmin) {
				const lesson = await Lesson.create(args);
				return lesson;
			}
			
			throw new AuthenticationError('Permission denied');
		},
		addReaction: async (_, args, context) => {
			if (context.user.isAdmin) {
				const reaction = await Reaction.create(args);
				return reaction;
			}
			
			throw new AuthenticationError('Permission denied');
		},
		addThought: async (_, args, context) => {
			if (context.user.isAdmin) {
				const thought = await Thought.create(args);
				return thought;
			}
			
			throw new AuthenticationError('Permission denied');
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });
	  
			if (!user) {
			  throw new AuthenticationError('Incorrect credentials');
			}
	  
			const correctPw = await user.isCorrectPassword(password);
	  
			if (!correctPw) {
			  throw new AuthenticationError('Incorrect credentials');
			}
	  
			const token = signToken(user);
			return { token, user };
		  },
	},
};

module.exports = resolvers;
