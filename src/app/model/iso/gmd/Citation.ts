
import { IsoDate } from './IsoDate';
import { Identifier } from './Identifier';
import { ResponsibleParty } from './ResponsibleParty';
import { PresentationForm } from './PresentationForm';
import { Series } from './Series';

export class Citation {
  title: string;
  alternateTitle: string[];
  date: IsoDate;
  edition: string;
  editionDate: Date;
  identifier: Identifier;
  citedResponsibleParty: ResponsibleParty[];
  presentationForm: PresentationForm[];
  series: Series;
  otherCitationDetais: string;
  collectiveTitle: string;
  isbn: string;
  issn: string;
}
