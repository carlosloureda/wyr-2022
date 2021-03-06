import { v4 as uuidv4 } from "uuid";

import questions from "@/data/questions.json";
import users from "@/data/users.json";

const Api = {
  get: async (url, query) => {
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
        } else if (url === "/questions/:questionId") {
          if (questions[query.questionId]) {
            resolve({
              ...questions[query.questionId],
              authorAvatarUrl:
                users[questions[query.questionId].author].avatarURL,
            });
          } else {
            reject(`Question ${query.questionId} not found`);
          }
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
          resolve({
            id: options.author,
            ...users[options.author],
          });
        } else if (url === "/questions/add") {
          resolve({
            id: uuidv4(),
            authorAvatarUrl: users[options.author].avatarURL,
            author: options.author,
            timestamp: Date.now(),
            optionOne: {
              votes: [],
              text: options.optionOne,
            },
            optionTwo: {
              votes: [],
              text: options.optionTwo,
            },
          });
        } else if (url.includes("/answer")) {
          const question = options.question;
          resolve({
            ...question,
            authorAvatarUrl: users[question.author].avatarURL,
            [options.answer]: {
              ...question[options.answer],
              votes: [...question[options.answer].votes, options.userId],
            },
          });
        } else {
          resolve({ ok: true });
        }
      }, 1500);
    });
  },
};
export default Api;
