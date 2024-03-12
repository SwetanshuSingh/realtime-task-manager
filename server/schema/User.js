import zod from "zod";

const UserSignUpSchema = zod.object({
  username: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

const UserSignInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});

export { UserSignUpSchema, UserSignInSchema };
