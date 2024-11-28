import mongoose, { Document, Schema } from "mongoose";

export interface IVote {
  userId: string;
  vote: string | null;
}

export interface ISession extends Document {
  title: string;
  token: string;
  owner: string;
  votes: IVote[];
  closed: boolean;
}

const voteSchema = new Schema<IVote>({
  userId: { type: String, required: true },
  vote: { type: String, required: false, default: null },
});

const sessionSchema = new Schema<ISession>({
  title: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  votes: { type: [voteSchema], default: [] },
  closed: { type: Boolean, default: false },
});

export const Session = mongoose.model<ISession>("Session", sessionSchema);