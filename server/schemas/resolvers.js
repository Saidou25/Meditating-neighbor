const { Location, User, Avatar, Profile, Request } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("location")
        .populate("avatar")
        .populate("profile")
        .populate("requests");
    },
    user: async (_, args) => {
      return User.findOne({ id: args._id })
        .populate("location")
        .populate("avatar")
        .populate("profile")
        .populate("requests");
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("location")
          .populate("avatar")
          .populate("profile")
          .populate("requests");
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
    profiles: async () => {
      return await Profile.find();
    },
    profile: async () => {
      return await Profile.findOne({ _id: args._id });
    },
    requests: async () => {
      return await Request.find();
    },
    request: async () => {
      return await Request.findOne({ _id: args._id });
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
    updateLocation: async (_, args) => {
      return await Location.findOneAndUpdate(
        { _id: args._id },
        {
          username: args.username,
          longitude: args.longitude,
          latitude: args.latitude,
          city: args.city,
          state: args.state,
          country: args.country,
        },
        { new: true }
      );
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
    deleteAvatar: async (_, args) => {
      return await Avatar.findOneAndDelete({ _id: args.id });
    },
    addProfile: async (_, args, context) => {
      if (context.user) {
        const profile = await Profile.create({
          username: args.username,
          stage: args.stage,
          years: args.years,
          teacher: args.teacher,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profile: profile._id } },
          { new: true }
        );
        return profile;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateProfile: async (_, args) => {
      return await Profile.findOneAndUpdate({
        _id: args.id,
        username: args.username,
        stage: args.stage,
        years: args.years,
        teacher: args.teacher,
      });
    },
    deleteProfile: async (_, args) => {
      return await Profile.findOneAndDelete({ _id: args.id });
    },
    addRequest: async (_, args, context) => {
      if (context.user) {
        const request = await Request.create({
          myName: args.myName,
          email: args.email,
          destinationName: args.destinationName
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { requests: request._id } },
          { new: true }
        );
        return request;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
