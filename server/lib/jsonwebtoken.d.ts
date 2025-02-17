 const sign = (payload : string | object, secret: string) => Promise<string>;
 const verify = (token: string, secret: string) => Promise<object>;

 export = {sign, verify};