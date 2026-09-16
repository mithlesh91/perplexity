import dotenv from 'dotenv';
dotenv.config();

import readline from 'readline/promises';
import { HumanMessage, tool, createAgent } from 'langchain';

import * as z from "zod"

import { sendMail } from "../service/node.mailer.js"
import { ChatMistralAI } from "@langchain/mistralai"

const Emailtool = tool(
  sendMail,
  {
    name: "Emailtool",
    description: "A tool for sending emails. It takes an object with the following properties: to, html, subject, text.",
    schema: z.object({
      to: z.string().describe("The recipient's email address."),
      html: z.string().describe("The HTML content of the email."),
      subject: z.string().describe("The subject of the email.")
    })
  }
)

// console.log("EMAIL:", process.env.GOOGLE_USER);
// console.log("CLIENT ID:", process.env.GOOGLE_CLINENT_ID ? "Loaded" : "Missing");
// console.log("CLIENT SECRET:", process.env.GOOGLE_CLINENT_SECRET ? "Loaded" : "Missing");
// console.log("REFRESH TOKEN:", process.env.GOOGLE_REFRACE_TOKEN ? "Loaded" : "Missing");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});



const model = new ChatMistralAI({
  model: "mistral-tiny",

})

const agent = createAgent({
  model,
  tools: [Emailtool],
})


let messages = []

export async function runAgent() {
  while (true) {
    const userInput = await rl.question('You: ');
    messages.push(new HumanMessage(userInput));
    const response = await agent.invoke({ messages });
    messages = response.messages;

    const lastMessage = response.messages[response.messages.length - 1];

    console.log(`AI: ${lastMessage.content}`);
  }

}
