const {
  Location,
  User,
  Avatar,
  Profile,
  Request,
  Contact,
} = require("../models");
const bcrypt = require('bcrypt');
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("location")
        .populate("avatar")
        .populate("profile")
        .populate("contacts");
    },
    user: async (_, args) => {
      return User.findOne({ _id: args._id })
        .populate("location")
        .populate("avatar")
        .populate("profile")
        .populate("contacts");
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("location")
          .populate("avatar")
          .populate("profile")
          .populate("contacts");
      }
    },
    locations: async () => {
      return await Location.find();
    },
    avatars: async () => {
      return await Avatar.find();
    },
    avatar: async () => {
      return await Avatar.findOne({ _id: args._id });
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
    contacts: async () => {
      return await Contact.find();
    },
    contact: async () => {
      return await Contact.findOne({ _id: args._id });
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
    updateUser: async (_, args) => {
      const { id, username, email, password } = args;
      const SALT_ROUNDS = 10;
      const updates = {};

      if (username) {
        updates.username = username;
      }

      if (email) {
        updates.email = email;
      }

      if (password) {
        updates.password = await bcrypt.hash(password, SALT_ROUNDS);
      }

      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
      return updatedUser;
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
    deleteLocation: async (_, args) => {
      return await Location.findOneAndDelete({ _id: args.id });
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
        }
      );
    },
    deleteAvatar: async (_, args, context) => {
      if (context.user) {
        const avatar = await Avatar.findOneAndDelete({ _id: args.id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { avatar: null } } // Use $pull to remove the reference
        );
        return avatar;
      }
    },
    addProfile: async (_, args, context) => {
      if (context.user) {
        const profile = await Profile.create({
          username: args.username,
          firstname: args.firstname,
          lastname: args.lastname,
          stage: args.stage,
          years: args.years,
          teacher: args.teacher,
          story: args.story,
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
    updateProfile: async (_, args, context) => {
      if (context.user) {
        const profile = await Profile.findOneAndUpdate(
          { _id: args.id },
          {
            username: args.username,
            firstname: args.firstname,
            lastname: args.lastname,
            stage: args.stage,
            years: args.years,
            teacher: args.teacher,
            story: args.story,
          }
        );
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { profile: profile._id } },
          { new: true }
        );
        return profile;
      }
    },
    deleteProfile: async (_, args) => {
      return await Profile.findOneAndDelete({ _id: args.id });
    },
    addRequest: async (_, args) => {
      return await Request.create({
        myName: args.myName,
        email: args.email,
        destinationName: args.destinationName,
        avatarUrl: args.avatarUrl,
      });
    },
    deleteRequest: async (_, args) => {
      return await Request.findOneAndDelete({ _id: args.id });
    },
    addContact: async (_, args) => {
      return await Contact.create({
        username: args.username,
        friendId: args.friendId,
        friendUsername: args.friendUsername,
        todaysDate: args.todaysDate,
        avatarUrl: args.avatarUrl,
        friendAvatarUrl: args.friendAvatarUrl,
      });
    },
    deleteContact: async (_, args, context) => {
      if (context.user) {
        const contact = await Contact.findOneAndDelete({ _id: args.id });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { contacts: contact._id } }
        );
        return contact;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteUser: async (_, args) => {
      return await User.findOneAndDelete({ _id: args.id });
    },
  },
};

module.exports = resolvers;
