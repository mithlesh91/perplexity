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
  model: "mistral-tiny",
  // apiKey: process.env.MISTRAL_API_KEY,
});

export const agent = createAgent({
  model,
  tools: [Emailtool],
});

const testAI = async () => {
  try {
    const response = await model.invoke("Say hello in one sentence");

    console.log("AI WORKING ✅");
    console.log(response.content);
  } catch (error) {
    console.error("AI NOT WORKING ❌");
    console.error(error);
  }
};

testAI();