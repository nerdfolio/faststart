import {Entity, Fields, Relations, Validators} from 'remult'

@Entity<User>('user', {})
export class User {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  name = ''

  @Fields.string({required: true, validate: [Validators.unique(), Validators.email()]})
  email = ''

  @Fields.boolean({required: true, defaultValue: () => false})
  emailVerified = false

  @Fields.string({required: false})
  image = ''

  @Fields.createdAt({required: true, defaultValue: () =>  new Date(), allowApiUpdate: false})
  createdAt! : Date

  @Fields.updatedAt({required: true, defaultValue: () =>  new Date(), allowApiUpdate: false})
  updatedAt! : Date

  @Fields.string({required: false})
  role = ''

  @Fields.boolean({required: false, defaultValue: () => false})
  banned = false

  @Fields.string({required: false})
  banReason = ''

  @Fields.date({required: false})
  banExpires = new Date()

  @Fields.string()
  theme = ''

  @Fields.boolean({defaultValue: () => false})
  isTest = false
}


@Entity<Session>('session', {})
export class Session {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.date({required: true})
  expiresAt = new Date()

  @Fields.string({required: true, validate: Validators.unique()})
  token = ''

  @Fields.createdAt({required: true, allowApiUpdate: false})
  createdAt! : Date

  @Fields.updatedAt({required: true, allowApiUpdate: false})
  updatedAt! : Date

  @Fields.string({required: false})
  ipAddress = ''

  @Fields.string({required: false})
  userAgent = ''

  @Fields.string({required: true})
  userId = ''
  @Relations.toOne<Session, User>(() => User, "id")
  user! : User

  @Fields.string({required: false})
  impersonatedBy = ''

  @Fields.string({required: false})
  activeOrganizationId = ''
}


@Entity<Account>('account', {})
export class Account {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  accountId = ''

  @Fields.string({required: true})
  providerId = ''

  @Fields.string({required: true})
  userId = ''
  @Relations.toOne<Account, User>(() => User, "id")
  user! : User

  @Fields.string({required: false})
  accessToken = ''

  @Fields.string({required: false})
  refreshToken = ''

  @Fields.string({required: false})
  idToken = ''

  @Fields.date({required: false})
  accessTokenExpiresAt = new Date()

  @Fields.date({required: false})
  refreshTokenExpiresAt = new Date()

  @Fields.string({required: false})
  scope = ''

  @Fields.string({required: false})
  password = ''

  @Fields.createdAt({required: true, allowApiUpdate: false})
  createdAt! : Date

  @Fields.updatedAt({required: true, allowApiUpdate: false})
  updatedAt! : Date
}


@Entity<Verification>('verification', {})
export class Verification {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  identifier = ''

  @Fields.string({required: true})
  value = ''

  @Fields.date({required: true})
  expiresAt = new Date()

  @Fields.createdAt({required: false, defaultValue: () =>  new Date(), allowApiUpdate: false})
  createdAt! : Date

  @Fields.updatedAt({required: false, defaultValue: () =>  new Date(), allowApiUpdate: false})
  updatedAt! : Date
}


@Entity<Organization>('organization', {})
export class Organization {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  name = ''

  @Fields.string({validate: Validators.unique()})
  slug = ''

  @Fields.string({required: false})
  logo = ''

  @Fields.createdAt({required: true, allowApiUpdate: false})
  createdAt! : Date

  @Fields.string({required: false})
  metadata = ''
}


@Entity<Member>('member', {})
export class Member {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  organizationId = ''
  @Relations.toOne<Member, Organization>(() => Organization, "id")
  organization! : Organization

  @Fields.string({required: true})
  userId = ''
  @Relations.toOne<Member, User>(() => User, "id")
  user! : User

  @Fields.string({required: true, defaultValue: () => "member"})
  role = ''

  @Fields.createdAt({required: true, allowApiUpdate: false})
  createdAt! : Date
}


@Entity<Invitation>('invitation', {})
export class Invitation {
  @Fields.string({required: true, minLength: 8, maxLength: 40, validate: Validators.unique(), allowApiUpdate: false})
  id! : string

  @Fields.string({required: true})
  organizationId = ''
  @Relations.toOne<Invitation, Organization>(() => Organization, "id")
  organization! : Organization

  @Fields.string({required: true, validate: Validators.email()})
  email = ''

  @Fields.string({required: false})
  role = ''

  @Fields.string({required: true, defaultValue: () => "pending"})
  status = ''

  @Fields.date({required: true})
  expiresAt = new Date()

  @Fields.string({required: true})
  inviterId = ''
  @Relations.toOne<Invitation, User>(() => User, "id")
  inviter! : User
}