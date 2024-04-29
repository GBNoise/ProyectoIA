import { GoogleGenerativeAI } from "@google/generative-ai";
import * as tf from "@tensorflow/tfjs";
import { createCanvas, loadImage } from "canvas";
import OpenAI from "openai";
import axios from "axios";

export const predict = async ({ images, model }) => {
  switch (model) {
    case "emotions":
      return await predictCustomModel({ images, modelName: model });

    default:
      return await predictMobileNet({ images });
  }
};

export const predictCustomModel = async ({
  images,
  modelName = "model.json",
}) => {
  if (!images) return [];
  // const model = await mobilenet.load();
  const model = await loadModel({ modelName: "model.json" });
  const emotions = ["Anger", "Disgust", "Fear", "Happy", "Sadness", "Surprise"];

  try {
    const predictions = await Promise.all(
      images.map(async (img) => {
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
          reader.onload = async () => {
            const imageElement = document.createElement("img");
            imageElement.src = reader.result;

            imageElement.onload = async () => {
              // const tensor = preprocessImage(imageElement);
              // // const prediction = await model.predict(imageElement);
              // const prediction = await model.predict(tensor);
              // const predictionData = await prediction.data();
              // const predictedClassIndex =
              //   emotions[predictionData.indexOf(Math.max(...predictionData))];

              // console.log({ predictionData, predictedClassIndex });
              // resolve(predictedClassIndex);

              const tensor = preprocessImage(imageElement);
              const prediction = await model.predict(tensor);
              const predictionsArray = prediction.arraySync();

              console.log({
                predictionsArray,
                emotion:
                  emotions[
                    predictionsArray[0].indexOf(
                      Math.max(...predictionsArray[0])
                    )
                  ],
              });

              resolve(
                emotions[
                  predictionsArray[0].indexOf(Math.max(...predictionsArray[0]))
                ]
              );
            };
          };
          reader.onerror = reject;
          reader.readAsDataURL(img);
        });
        return promise;
      })
    );

    return predictions;
  } catch (e) {
    return Promise.reject(e);
  }
};

async function loadModel({ modelName }) {
  // const model = await tf.loadGraphModel(modelName);
  const model = await tf.loadLayersModel(modelName);
  console.log("Model loaded successfully!");
  return model;
}

function preprocessImage(imageElement) {
  const targetSize = 128; // Target size of the image expected by the model
  const canvas = createCanvas(targetSize, targetSize);
  const ctx = canvas.getContext("2d");

  // Resize image to target size
  ctx.drawImage(imageElement, 0, 0, targetSize, targetSize);

  // Convert canvas to tensor
  const tensor = tf.browser.fromPixels(canvas).toFloat();

  // Normalize pixel values to [0, 1]
  const normalizedTensor = tensor.div(tf.scalar(255));

  // Expand dimensions to match model input shape
  const expandedTensor = normalizedTensor.expandDims();

  return expandedTensor;
}

export const generateStory = async ({ characters, scenarios, emotions }) => {
  console.log({ characters, scenarios, emotions });

  try {
    const key = "AIzaSyBPZ6Y78hkd8ej1iXgqY8kR4WlSbxlkEyY";

    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    let query = `Generame un cuento con los siguientes personajes ${characters.join(
      ","
    )}
    en los sigiuentes escenarios ${scenarios.join(
      ","
    )} y con las siguientes emociones ${emotions.join(",")};
    toma en cuenta que algunos de los inputs estan en ingles, pero el cuento tiene que ser español`;
    const result = await model.generateContent(query);

    console.log({ geminiResul: result });

    const response = await result.response;
    const text = await response.text();
    console.log({ query, text });
    return text;
  } catch (e) {
    console.log("error", e);
  }
};

export const predictMobileNet = async ({ images }) => {
  if (!images) return [];
  const model = await mobilenet.load();

  try {
    const predictions = await Promise.all(
      images.map(async (img) => {
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
          reader.onload = async () => {
            const imageElement = document.createElement("img");
            imageElement.src = reader.result;

            imageElement.onload = async () => {
              const prediction = await model.classify(imageElement);

              resolve(prediction[0].className);
            };
          };
          reader.onerror = reject;
          reader.readAsDataURL(img);
        });
        return promise;
      })
    );

    return predictions;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const generateStoryChatGPT = async ({
  characters,
  scenarios,
  emotions,
}) => {
  try {
    const API_KEY = "";
    let query = `Generame un cuento con los siguientes personajes ${characters.join(
      ","
    )}
    en los sigiuentes escenarios ${scenarios.join(
      ","
    )} y con las siguientes emociones ${emotions.join(",")};
    toma en cuenta que algunos de los inputs estan en ingles, pero el cuento tiene que ser español`;

    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: query }],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    console.log({ CHATGPTres: res.data });
  } catch (e) {
    console.log({ e });
  }
};
