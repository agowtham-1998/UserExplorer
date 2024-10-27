import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const CompanyModel = types.model({
  name: types.optional(types.string, ""),
});

const UserModel = types.model({
  id: types.identifierNumber,
  firstName: types.optional(types.string, ""),
  lastName: types.optional(types.string, ""),
  email: types.optional(types.string, ""),
  company: types.optional(CompanyModel, {}),
});

const UserStore = types
  .model({
    users: types.array(UserModel),
    page: types.number,
    isLoading: types.boolean,
  })
  .actions(self => ({
    fetchUsers: flow(function* () {
      self.isLoading = true;
      try {
        const response = yield axios.get(`https://dummyjson.com/users`);
        self.users = self.users.concat(response.data.users);
        self.page += 1;
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        self.isLoading = false;
      }
    }),
  }));

const PostModel = types.model({
  id: types.identifierNumber,
  title: types.string,
  body: types.string,
});

const PostStore = types
  .model({
    posts: types.array(PostModel),
    page: types.number,
    isLoading: types.boolean,
  })
  .actions(self => ({
    fetchPosts: flow(function* (userId) {
      self.isLoading = true;
      try {
        const response = yield axios.get(`https://dummyjson.com/users/${userId}/posts`);
        self.posts = self.posts.concat(response.data.posts);
        self.page += 1;
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        self.isLoading = false;
      }
    }),
    reset: () => {
      self.posts = [];
      self.page = 1;
    },
  }));

const RootStore = types.model({
  userStore: UserStore,
  postStore: PostStore,
});

const store = RootStore.create({
  userStore: {
    users: [],
    page: 1,
    isLoading: false,
  },
  postStore: {
    posts: [],
    page: 1,
    isLoading: false,
  },
});

export default store;
