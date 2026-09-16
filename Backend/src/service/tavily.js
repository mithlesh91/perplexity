const { tavily } = require("@tavily/core");

const tvly = tavily({
   apikey: process.env.TAVILY_API_KEY
});

export const searchTavily = async (query) => {
   const response = await tvly.search(query);
   console.log(response);
}