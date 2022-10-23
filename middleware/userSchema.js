export const userSchema = {
  type: "object",
  properties: {
    email: { type: "string" },
    min: { type: "int" },
    max: { type: "int" },
  },
  required: ["email", "min", "max"],
};

export default userSchema;
