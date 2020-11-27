export default interface Option {
  createdBy: number;
  createdOn: string | Date;
  description: string;
  isActive: boolean;
  lambda: any;
  phqidIfSelected: number;
  priority: number;
  questionId: number;
  questionOptionId: number;
  value: string;
}
