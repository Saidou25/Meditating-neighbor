const { Location, User, Avatar } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("location").populate("avatar");
    },
    user: async (_, args) => {
      return User.findOne({ id: args._id })
        .populate("location")
        .populate("avatar");
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("location")
          .populate("avatar");
      }
    },
    locations: async () => {
      return await Location.find();
    },
    avatars: async () => {
      return await Avatar.find();
    },
    avatar: async () => {
      return await Avatar.findOneAndUpdate({ id: args._id });
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
    addAvatar: async (_, args, context) => {
      if (context.user) {
        const avatar = await Avatar.create({
          username: args.username,
          avatarUrl: args.avatarUrl,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { avatar: avatar._id } },
          { new: true }
        );
        return avatar;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateAvatar: async (_, args) => {
      return await Avatar.findOneAndUpdate(
        { _id: args.id },
        {
          username: args.username,
          avatarUrl: args.avatarUrl,
        },
        { new: true }
      );
    },
    deleteAvatar: async (_, args, context) => {
      return await Avatar.findOneAndDelete({ _id: args.id });
    },
  },
};

module.exports = resolvers;
