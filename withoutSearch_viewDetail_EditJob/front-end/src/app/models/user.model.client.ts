// user.model.client.ts
export class User {
  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public password: string,
    public username: string,
    public phone: string,
    public role: string,
    public address: string,
    public tagline: string,
    public imageUrl: string,
    public requestStatus: string,
    public premiumRequestStatus: string,
    public socialContact: any,
  ) {}
}
