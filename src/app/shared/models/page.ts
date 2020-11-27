import Section from './section';

export default interface Page {
  pageId: number;
  name: string;
  label: string;
  nextPageId: number;
  outlet: any;
  validation: any;
  priority: number;
  createdOn: string | Date;
  createdBy: number;
  isActive: boolean;
  sections: Section[];
}
