const { response, request} = require("express");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.API_KEY
});
const openai = new OpenAIApi(configuration);

const callChatGpt = async(req = request, res = response)=>{

    try {

        const {prompt} = req.body;

        let queryObj = {
            model: "gpt-3.5-turbo",
            messages: [{"role":"user", "content": prompt}],
            max_tokens: 100,
            temperature:1
        }

        const completion = await openai.createChatCompletion(queryObj);
        const message = completion.data.choices[0].message;
        const usage = completion.data.usage;

        res.json({message,usage});

        
    } catch (error) {
        console.log(JSON.stringify(error));
    }

}

const callImageGpt = async(req = request, res = response)=>{
    try {
        const {prompt, nImage, size} = req.body;
        
        let queryObj = {
            "prompt": prompt,
            "n": nImage,
            "size": size
          }

        const response = await openai.createImage(queryObj);
        const dataImg = response.data;
        res.json(dataImg);

    } catch (error) {
        console.log("error "+JSON.stringify(error));
    }
}

module.exports = {
    callChatGpt,
    callImageGpt
}