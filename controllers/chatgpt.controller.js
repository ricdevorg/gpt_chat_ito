const { response, request } = require("express");
const { Configuration, OpenAIApi } = require("openai");

this.OpenAIURL = 'https://api.openai.com/v1';

const callChatGpt = async(req = request,res = response)=>{
    try {

        const {prompt} = req.body;

        let queryObj = {
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            max_tokens: 100,
            temperature: 1
        }

        const configuration = new Configuration({
            apiKey: process.env.API_KEY
        });

        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion(queryObj);
        const message = completion.data.choices[0].message;
        const usage = completion.data.usage;
        res.json({message, usage});

    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

module.exports = {
    callChatGpt
}