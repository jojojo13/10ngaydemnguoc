export class CandidateFilter {
  name: string | undefined;
  yob: number | undefined;
  phone: string | undefined;
  email: string | undefined;
  location: string | undefined;
  position: string | undefined;
  yearExp: string | undefined;
  language: string | undefined;
  index?: number | undefined;
  size: number | undefined;
  status: number | undefined;
  constructor(
    name: string = '',
    yob: number = 0,
    phone: string = '',
    email: string = '',
    location: string = '',
    position: string = '',
    yearExp: string = '',
    language: string = '',
    index: number = 0,
    size: number = 10,
    status: number = 1
  ) {
    (this.name = name),
      (this.yob = yob),
      (this.phone = phone),
      (this.email = email),
      (this.location = location),
      (this.position = position),
      (this.yearExp = yearExp),
      (this.language = language),
      (this.index = index),
      (this.size = size),
      (this.status = status);
  }
}
