import zod from "zod";

const taskSchema = zod.object({
  title: zod.string().min(5),
  description: zod.string(),
});

export { taskSchema };
