import { v4 as uuidv4 } from "uuid";

import questions from "../data/questions.json";
import users from "../data/users.json";

const Api = {
  get: async (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/questions") {
          const parsedQuestions = Object.values(questions).reduce(
            (acc, question) => {
              acc[question.id] = {
                ...question,
                authorAvatarUrl: users[question.author].avatarURL,
              };
              return acc;
            },
            {}
          );
          resolve(parsedQuestions);
        } else {
          resolve({ ok: true });
        }
      }, 1500);
    });
  },
  post: async (url, options) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/login") {
          resolve({ id: options.author });
        } else if (url === "/questions/add") {
          resolve(uuidv4());
        } else {
          resolve({ ok: true });
        }
      }, 1500);
    });
  },
};
export default Api;
