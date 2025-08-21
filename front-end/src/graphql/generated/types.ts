import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Activity = {
  __typename?: 'Activity';
  city: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  owner: User;
  price: Scalars['Int']['output'];
};

export type AddToFavoritesInput = {
  activityId: Scalars['ID']['input'];
};

export type CreateActivityInput = {
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToFavorites: UserFavorite;
  createActivity: Activity;
  login: SignInDto;
  logout: Scalars['Boolean']['output'];
  register: User;
  removeFromFavorites: Scalars['Boolean']['output'];
  reorderFavorites: Scalars['Boolean']['output'];
  toggleDebugMode: User;
};


export type MutationAddToFavoritesArgs = {
  input: AddToFavoritesInput;
};


export type MutationCreateActivityArgs = {
  createActivityInput: CreateActivityInput;
};


export type MutationLoginArgs = {
  signInInput: SignInInput;
};


export type MutationRegisterArgs = {
  signUpInput: SignUpInput;
};


export type MutationRemoveFromFavoritesArgs = {
  input: RemoveFromFavoritesInput;
};


export type MutationReorderFavoritesArgs = {
  input: ReorderFavoritesInput;
};

export type Query = {
  __typename?: 'Query';
  getActivities: Array<Activity>;
  getActivitiesByCity: Array<Activity>;
  getActivitiesByUser: Array<Activity>;
  getActivity: Activity;
  getCities: Array<Scalars['String']['output']>;
  getLatestActivities: Array<Activity>;
  getMe: User;
  getUserFavorites: Array<UserFavoriteWithActivity>;
  isFavorite: Scalars['Boolean']['output'];
};


export type QueryGetActivitiesByCityArgs = {
  activity?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetActivityArgs = {
  id: Scalars['String']['input'];
};


export type QueryIsFavoriteArgs = {
  activityId: Scalars['ID']['input'];
};

export type RemoveFromFavoritesInput = {
  activityId: Scalars['ID']['input'];
};

export type ReorderFavoritesInput = {
  activityIds: Array<Scalars['ID']['input']>;
};

export type SignInDto = {
  __typename?: 'SignInDto';
  access_token: Scalars['String']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignUpInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  debugModeEnabled?: Maybe<Scalars['Boolean']['output']>;
  email: Scalars['String']['output'];
  favorites: Array<Activity>;
  favoritesCount: Scalars['Int']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UserFavorite = {
  __typename?: 'UserFavorite';
  activity: Activity;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type UserFavoriteWithActivity = {
  __typename?: 'UserFavoriteWithActivity';
  activity: Activity;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
};

export type ActivityFragment = { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } };

export type OwnerFragment = { __typename?: 'User', firstName: string, lastName: string };

export type UserFavoriteFragment = { __typename?: 'UserFavorite', id: string, order: number, createdAt: any, activity: { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } } };

export type CreateActivityMutationVariables = Exact<{
  createActivityInput: CreateActivityInput;
}>;


export type CreateActivityMutation = { __typename?: 'Mutation', createActivity: { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, owner: { __typename?: 'User', firstName: string, lastName: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SigninMutationVariables = Exact<{
  signInInput: SignInInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', login: { __typename?: 'SignInDto', access_token: string } };

export type SignupMutationVariables = Exact<{
  signUpInput: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string } };

export type ToggleDebugModeMutationVariables = Exact<{ [key: string]: never; }>;


export type ToggleDebugModeMutation = { __typename?: 'Mutation', toggleDebugMode: { __typename?: 'User', id: string, debugModeEnabled?: boolean | null } };

export type AddToFavoritesMutationVariables = Exact<{
  input: AddToFavoritesInput;
}>;


export type AddToFavoritesMutation = { __typename?: 'Mutation', addToFavorites: { __typename?: 'UserFavorite', id: string, order: number, createdAt: any, activity: { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } } } };

export type RemoveFromFavoritesMutationVariables = Exact<{
  input: RemoveFromFavoritesInput;
}>;


export type RemoveFromFavoritesMutation = { __typename?: 'Mutation', removeFromFavorites: boolean };

export type ReorderFavoritesMutationVariables = Exact<{
  input: ReorderFavoritesInput;
}>;


export type ReorderFavoritesMutation = { __typename?: 'Mutation', reorderFavorites: boolean };

export type GetActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActivitiesQuery = { __typename?: 'Query', getActivities: Array<{ __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } }> };

export type GetActivitiesByCityQueryVariables = Exact<{
  activity?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  price?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetActivitiesByCityQuery = { __typename?: 'Query', getActivitiesByCity: Array<{ __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } }> };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } } };

export type GetLatestActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLatestActivitiesQuery = { __typename?: 'Query', getLatestActivities: Array<{ __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } }> };

export type GetUserActivitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserActivitiesQuery = { __typename?: 'Query', getActivitiesByUser: Array<{ __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getMe: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, role: string, debugModeEnabled?: boolean | null } };

export type GetCitiesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCitiesQuery = { __typename?: 'Query', getCities: Array<string> };

export type GetUserFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFavoritesQuery = { __typename?: 'Query', getUserFavorites: Array<{ __typename?: 'UserFavoriteWithActivity', id: string, order: number, createdAt: any, activity: { __typename?: 'Activity', id: string, city: string, description: string, name: string, price: number, createdAt?: any | null, owner: { __typename?: 'User', firstName: string, lastName: string } } }> };

export type IsFavoriteQueryVariables = Exact<{
  activityId: Scalars['ID']['input'];
}>;


export type IsFavoriteQuery = { __typename?: 'Query', isFavorite: boolean };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Activity: ResolverTypeWrapper<Activity>;
  AddToFavoritesInput: AddToFavoritesInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateActivityInput: CreateActivityInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveFromFavoritesInput: RemoveFromFavoritesInput;
  ReorderFavoritesInput: ReorderFavoritesInput;
  SignInDto: ResolverTypeWrapper<SignInDto>;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserFavorite: ResolverTypeWrapper<UserFavorite>;
  UserFavoriteWithActivity: ResolverTypeWrapper<UserFavoriteWithActivity>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Activity: Activity;
  AddToFavoritesInput: AddToFavoritesInput;
  Boolean: Scalars['Boolean']['output'];
  CreateActivityInput: CreateActivityInput;
  DateTime: Scalars['DateTime']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  RemoveFromFavoritesInput: RemoveFromFavoritesInput;
  ReorderFavoritesInput: ReorderFavoritesInput;
  SignInDto: SignInDto;
  SignInInput: SignInInput;
  SignUpInput: SignUpInput;
  String: Scalars['String']['output'];
  User: User;
  UserFavorite: UserFavorite;
  UserFavoriteWithActivity: UserFavoriteWithActivity;
};

export type ActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activity'] = ResolversParentTypes['Activity']> = {
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addToFavorites?: Resolver<ResolversTypes['UserFavorite'], ParentType, ContextType, RequireFields<MutationAddToFavoritesArgs, 'input'>>;
  createActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<MutationCreateActivityArgs, 'createActivityInput'>>;
  login?: Resolver<ResolversTypes['SignInDto'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'signInInput'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  register?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'signUpInput'>>;
  removeFromFavorites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRemoveFromFavoritesArgs, 'input'>>;
  reorderFavorites?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationReorderFavoritesArgs, 'input'>>;
  toggleDebugMode?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getActivities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  getActivitiesByCity?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType, RequireFields<QueryGetActivitiesByCityArgs, 'city'>>;
  getActivitiesByUser?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  getActivity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType, RequireFields<QueryGetActivityArgs, 'id'>>;
  getCities?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  getLatestActivities?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  getMe?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  getUserFavorites?: Resolver<Array<ResolversTypes['UserFavoriteWithActivity']>, ParentType, ContextType>;
  isFavorite?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryIsFavoriteArgs, 'activityId'>>;
};

export type SignInDtoResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignInDto'] = ResolversParentTypes['SignInDto']> = {
  access_token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  debugModeEnabled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Array<ResolversTypes['Activity']>, ParentType, ContextType>;
  favoritesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserFavoriteResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFavorite'] = ResolversParentTypes['UserFavorite']> = {
  activity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserFavoriteWithActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFavoriteWithActivity'] = ResolversParentTypes['UserFavoriteWithActivity']> = {
  activity?: Resolver<ResolversTypes['Activity'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Activity?: ActivityResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignInDto?: SignInDtoResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFavorite?: UserFavoriteResolvers<ContextType>;
  UserFavoriteWithActivity?: UserFavoriteWithActivityResolvers<ContextType>;
};

