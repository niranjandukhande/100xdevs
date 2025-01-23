// when using zod, we're doing runtime validation
//npm install express @types/express zod

import z from "zod"

// this is a runtime variable
const StringZodSchema = z.string();

// infer its ts type by infering
type StringZodType = z.infer<typeof StringZodSchema>;


// ------------------------------------------
const userProfileSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().min(18).optional()
})

type FinalUserSchema = z.infer<typeof userProfileSchema>