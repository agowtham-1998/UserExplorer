import { types } from "mobx-state-tree";

const PostModel = types.model("PostModel", {
  id: types.identifierNumber,
  title: types.string,
  body: types.string,
});

export default PostModel;
