import { Activity } from './activity';

export interface Course{
  ID?:                  any;
  description:       string;
  activities:    Activity[];
}
