// create model for what i need from user [backend]
import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

// look at [models.Prompt] see if it is exist
// if not then create new model
const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
