import { GoogleGenerativeAI } from "@google/generative-ai";

export const predict = async ({ images }) => {
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

export const generateStory = async ({ characters, scenarios, emotions }) => {
  const key = "AIzaSyBPZ6Y78hkd8ej1iXgqY8kR4WlSbxlkEyY";

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  try {
    const result = await model.generateContent(
      `Generame un cuento con los siguientes personajes ${characters} 
      en los sigiuentes escenarios ${scenarios} y con las siguientes emociones ${emotions};
      toma en cuenta que algunos de los inputs estan en ingles, pero el cuento tiene que ser español`
    );

    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (e) {
    console.log(e);
  }
};
