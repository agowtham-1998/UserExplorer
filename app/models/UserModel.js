import { types } from "mobx-state-tree";

const UserModel = types.model("UserModel", {
  id: types.identifierNumber,
  firstName: types.string,
  lastName: types.string,
  email: types.string,
  company: types.maybe(types.model({ name: types.string })),
});

export default UserModel;
