import { Schema, model } from "mongoose";

const noteSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
        },

        content: {
            type: String,
            required: true,
            trim: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
    }
);

const Note = model("Note", noteSchema);

export default Note;