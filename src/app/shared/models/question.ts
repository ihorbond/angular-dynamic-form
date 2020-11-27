import Option from './option';

export default interface Question {
  questionId: number;
  sectionId: number;
  name: string;
  label: string;
  ui: string;
  priority: number;
  procAttribID: number;
  isRequired: boolean;
  lambda: any;
  createdOn: string | Date;
  createdBy: number;
  phqidIfSelected: number;
  isActive: boolean;
  options: Option[];
}
