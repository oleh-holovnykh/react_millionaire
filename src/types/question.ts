export interface Question {
  id: number,
  content: string,
  answers: string[] | null,
  correct: string[] | null,
}
