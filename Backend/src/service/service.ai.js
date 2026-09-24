import dotenv from "dotenv";
dotenv.config();

import { tool, createAgent } from "langchain";
import * as z from "zod";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

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

const Mistralmodel = new ChatMistralAI({
  model: "mistral-tiny",
});

const GoogleModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey:process.env.GOOGLE_API_KEY
})

export async function generateresponse(message) {
  const response = await GoogleModel.invoke([
    new HumanMessage(message)
  ])
  return response.text
}

export async function generatechattitle(message) {
  const response = await Mistralmodel.invoke([
    new SystemMessage(`you are a helpful assistant that generates concise and descriptive title for chat conversation. 
        
        user will provide you with the first message of chat conversation,and you will generate a title that captures the essance the essence of the conversation in 2-4 words. the title should be clear,relevant, and enaging,giving user a quick understanding of the chat's topic
        `),
    new HumanMessage(`Generate a title for chat conversation base on the following first message:"${message}"`)
  ])
  return response.text
}

// export const agent = createAgent({
//   model,
//   tools: [Emailtool],
// });