import { formSchema } from "../schemas/formSchema"
import { InferType } from "yup"
export type Form = InferType<typeof formSchema>