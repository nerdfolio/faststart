import {Entity, Fields, Relations} from 'remult'

@Entity('user', {})
export class User {
  @Fields.cuid()
  id : string

  @Fields.string({required: true})
  name = ''

  @Fields.string({required: true, unique: true, email: true})
  email = ''

  @Fields.boolean({required: true})
  emailVerified = false

  @Fields.string({required: false})
  image = ''

  @Fields.createdAt({required: true})
  createdAt: new Date()

  @Fields.updatedAt({required: true})
  updatedAt: new Date()
}


@Entity('session', {})
export class Session {
  @Fields.cuid()
  id : string

  @Fields.date({required: true})
  expiresAt: Date

  @Fields.string({required: true, unique: true})
  token = ''

  @Fields.createdAt({required: true})
  createdAt: new Date()

  @Fields.updatedAt({required: true})
  updatedAt: new Date()

  @Fields.string({required: false})
  ipAddress = ''

  @Fields.string({required: false})
  userAgent = ''

  @Fields.string({required: true})
  userId = ''
  @Relations.toOne<Session, User>(() => User, id)
  user : User
}


@Entity('account', {})
export class Account {
  @Fields.cuid()
  id : string

  @Fields.string({required: true})
  accountId = ''

  @Fields.string({required: true})
  providerId = ''

  @Fields.string({required: true})
  userId = ''
  @Relations.toOne<Account, User>(() => User, id)
  user : User

  @Fields.string({required: false})
  accessToken = ''

  @Fields.string({required: false})
  refreshToken = ''

  @Fields.string({required: false})
  idToken = ''

  @Fields.date({required: false})
  accessTokenExpiresAt: Date

  @Fields.date({required: false})
  refreshTokenExpiresAt: Date

  @Fields.string({required: false})
  scope = ''

  @Fields.string({required: false})
  password = ''

  @Fields.createdAt({required: true})
  createdAt: new Date()

  @Fields.updatedAt({required: true})
  updatedAt: new Date()
}


@Entity('verification', {})
export class Verification {
  @Fields.cuid()
  id : string

  @Fields.string({required: true})
  identifier = ''

  @Fields.string({required: true})
  value = ''

  @Fields.date({required: true})
  expiresAt: Date

  @Fields.createdAt({required: false})
  createdAt: new Date()

  @Fields.updatedAt({required: false})
  updatedAt: new Date()
}