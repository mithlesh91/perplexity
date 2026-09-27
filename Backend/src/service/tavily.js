import dotenv from "dotenv";
dotenv.config();

import { tavily } from "@tavily/core";

const tvly = tavily({
    apiKey: process.env.TAVILY_API_KEY
});

export const searchTavily = async ({query}) => {
    console.log("🔎 Tavily query:", query);

    const result = await tvly.search(query, {
        maxResults: 5,
        searchDepth: "advanced"
    });

    console.log("✅ Tavily result received");

    return JSON.stringify(result);
};