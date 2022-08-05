export class Request {
  private id: number | undefined;
  private name: string | undefined;
  private code: string | undefined;
  private requestLevel: number | undefined;
  private orgnizationId: number | undefined;
  private positionID: number | undefined;
  private number: number | undefined;
  private signId: number | undefined;
  private effectDate: string | undefined;
  private expireDate: string | undefined;
  private yearExperience: number | undefined;
  private level: number | undefined;
  private type: number | undefined;
  private project: number | undefined;
  private budget: number | undefined;
  private note: string | undefined;
  private comment: string | undefined;
  private status: number | undefined;
  private parentID: number | undefined;
  private rank: number | undefined;
  private createBy: string | undefined;
  private createDate: string | undefined;
  private updateBy: string | undefined;
  private updateDate: string | undefined;
  private hrInchange: number | undefined;
  private otherSkill: number | undefined;


	constructor($id: number , $name: string , $code: string , $requestLevel: number , $orgnizationId: number , $positionID: number , $number: number , $signId: number , $effectDate: string , $expireDate: string , $yearExperience: number , $level: number , $type: number , $project: number , $budget: number , $note: string , $comment: string , $status: number , $parentID: number , $rank: number , $createBy: string , $createDate: string , $updateBy: string , $updateDate: string , $hrInchange: number , $otherSkill: number ) {
		this.id = $id;
		this.name = $name;
		this.code = $code;
		this.requestLevel = $requestLevel;
		this.orgnizationId = $orgnizationId;
		this.positionID = $positionID;
		this.number = $number;
		this.signId = $signId;
		this.effectDate = $effectDate;
		this.expireDate = $expireDate;
		this.yearExperience = $yearExperience;
		this.level = $level;
		this.type = $type;
		this.project = $project;
		this.budget = $budget;
		this.note = $note;
		this.comment = $comment;
		this.status = $status;
		this.parentID = $parentID;
		this.rank = $rank;
		this.createBy = $createBy;
		this.createDate = $createDate;
		this.updateBy = $updateBy;
		this.updateDate = $updateDate;
		this.hrInchange = $hrInchange;
		this.otherSkill = $otherSkill;
	}
	
  

}
