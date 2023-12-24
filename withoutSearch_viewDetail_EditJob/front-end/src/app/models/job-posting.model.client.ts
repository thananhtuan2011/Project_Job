export class JobPostingModelClient {
  constructor(
    //public _id: string = '',
    public _id:any=null,
    public id: string = '',
    public title: string = '',
    public created_at: string = '',
    public location: string = '',
    public type: string = '',
    public description: string = '',
    public skillsRequired: string[] = [],
    public company: string = '',
    public responsibilities: string[] = [],
    public company_logo: string = '',
    public jobSource: string = '',
    public datePosted: Date = new Date(),
    public minQualification: string[] = [],
    public date: string = '',
    public how_to_apply: string = '',
    public company_url: string = '',
  ) {}
}
