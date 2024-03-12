import zod from "zod";

const UserSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

export default UserSchema;
