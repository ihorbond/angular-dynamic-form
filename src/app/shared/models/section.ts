import Question from './question';

export default interface Section {
  sectionId: number;
  pageId: number;
  priority: number;
  label: string;
  type: any;
  createdOn: string | Date;
  createdBy: number;
  isActive: boolean;
  questions: Question[];
}
