export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Guid: any;
};

export type ProfileType = {
  userId?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  organizationId?: Maybe<Scalars["Guid"]>;
  isSuperAdmin?: Maybe<Scalars["Boolean"]>;
  isAdmin?: Maybe<Scalars["Boolean"]>;
};
