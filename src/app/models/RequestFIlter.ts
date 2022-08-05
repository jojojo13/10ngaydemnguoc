export class RequestFilter {
  code: string | undefined;
  name: string | undefined;
  orgName: string | undefined;
  positionName: string | undefined;
  quantity: number | undefined;
  createOn: string | undefined;
  deadLine: string | undefined;
  hrInchange: string | undefined;
  status: string | undefined;
  otherSkill: string | undefined;
  index?: number | undefined;
  size: number | undefined;

  constructor(
    code: string = '',
    name: string = '',
    orgName:string='',
    positionName:string='',
    createOn: string = '1000-01-01T15:37:54.773Z',
    deadLine: string = '1000-01-01T15:37:54.773Z',
    hrInchange: string = '',
    status: string = '',
    otherSkill: string = '',
    index: number = 0,
    size: number = 10,
    quantity:number=0
  ) {
    this.code=code,
    this.name=name,
    this.orgName=orgName,
    this.positionName=positionName,
    this.createOn=createOn,
    this.deadLine=deadLine,
    this.hrInchange=hrInchange,
    this.status=status,
    this.otherSkill=otherSkill,
    this.index=index,
    this.size=size,
    this.quantity=quantity
      
  }
}
