export class MockData{
    htmlContent: string;
    questions: Question[];
}

export class Question {
    id: number;
    text: string;
}

export class ModelToPost {
    questionId: number;
    htmlContent: string;
}
