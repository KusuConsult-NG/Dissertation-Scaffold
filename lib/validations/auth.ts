import { z } from "zod";

export const userAuthSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be less than 100 characters"),
});

export const userRegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
    state: z.string().min(1, "Please select a state"),
    lga: z.string().min(1, "Please select an LGA"),
    institution: z.string().min(2, "Institution name is required"),
    researchLevel: z.string().min(1, "Please select your research level"),
    researchArea: z.string().min(2, "Research area is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password must be less than 100 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type UserAuthSchema = z.infer<typeof userAuthSchema>;
export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
