import answersFromServer from '../api/answers.json';
import questionsFromServer from '../api/questions.json';
import { Answer } from '../types/Answer';
import { Question } from '../types/QuestionWithUnswer';

function getAnswersById(id: number): Answer | null {
  return answersFromServer.find((answer) => answer.questionId === id) || null;
}

export const questionsWithAnswers: Question[] = questionsFromServer.map(
  (question) => ({
    ...question,
    answers: getAnswersById(question.id)?.answers || null,
    correct: getAnswersById(question.id)?.correct || null,
  }),
);
