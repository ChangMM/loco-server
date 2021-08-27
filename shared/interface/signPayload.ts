export enum UserType {
  user = 'user',
  admin = 'admin',
}

export interface SignPayload {
  userType: UserType
  uid: number
  iat: number
  exp: number
}
