export class Job {
  constructor(
  public id: string,
  public title: string,
  public created_at: string,
  public location: string,
  public type: string,
  public description: string,
  public how_to_apply: string,
  public company: string,
  public company_url: string,
  public company_logo: string,
  public url: string,
  public jobSource: string,
  public datePosted: Date,
  ) {}
}

