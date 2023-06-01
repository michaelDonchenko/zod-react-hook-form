import {z} from "zod";

export const registrationSchema = z
  .object({
    name: z.string().min(2, {message: "Name has to be at least 2 characters"}),
    email: z.string().email({message: "Not a valid email"}),
    password: z.string().min(5, {message: "Password has to be at least 5 characters"}),
    confirmPassword: z
      .string()
      .min(5, {message: "Confirm password has to be at least 5 characters"}),
    birthday: z.string().transform((value) => new Date(value)),
    gender: z.string({
      errorMap: () => {
        return {message: "You have to select a gender"};
      },
    }),
    termsAndConditions: z.boolean(),
  })
  .superRefine(({password, confirmPassword, termsAndConditions, birthday}, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }

    if (termsAndConditions !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You have to except terms and conditions",
        path: ["termsAndConditions"],
      });
    }

    if (birthday) {
      const now = new Date();
      const nowMinus18Years = now.getTime() - 567648000000;
      const isValidAge = birthday.getTime() < nowMinus18Years;

      console.log(birthday.getTime(), nowMinus18Years, isValidAge);
      if (Number.isNaN(birthday.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Not a valid date",
          path: ["birthday"],
        });
      }

      if (!isValidAge) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Have to be at least 18 years old",
          path: ["birthday"],
        });
      }
    }
  });

export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
