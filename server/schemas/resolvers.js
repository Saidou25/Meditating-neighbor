const { Location, User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("location");
    },
    user: async (_, args) => {
      return User.findOne({ id: args._id }).populate("location");
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("location");
      }
    },
    locations: async () => {
      return await Location.find();
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });
      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addLocation: async (_, args, context) => {
      if (context.user) {
        const location = await Location.create({
          username: args.username,
          latitude: args.latitude,
          longitude: args.longitude,
          city: args.city,
          state: args.state,
          country: args.country,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { location: location._id } },
          { new: true }
        );
        return location;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateUser: async (_, args) => {
      return await User.findOneAndUpdate(
        { _id: args.id },
        {
          username: args.username,
          email: args.email,
          avatarUrl: args.avatarUrl,
          location: location,
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
