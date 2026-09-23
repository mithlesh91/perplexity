import dotenv from "dotenv";
dotenv.config();

import {  tool, createAgent } from "langchain";
import * as z from "zod";
import { ChatMistralAI } from "@langchain/mistralai";
import { sendMail } from "../service/node.mailer.js";

const Emailtool = tool(sendMail, {
  name: "Emailtool",
  description:
    "A tool for sending emails. It takes to, html, subject and text.",
  schema: z.object({
    to: z.string().describe("Recipient email address"),
    html: z.string().describe("HTML email content"),
    subject: z.string().describe("Email subject"),
    text: z.string().optional().describe("Plain text email content"),
  }),
});

const model = new ChatMistralAI({
  model:"mistral-tiny",
});

export const agent = createAgent({
  model,
  tools: [Emailtool],
});