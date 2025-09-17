// Hashnode GraphQL API Types

export interface HashnodeTag {
  name: string;
}

export interface HashnodeCoverImage {
  url: string;
}

export interface HashnodeAbout {
  text: string;
}

export interface HashnodePublication {
  title: string;
  displayTitle: string;
  about: HashnodeAbout;
}

export interface HashnodePost {
  title: string;
  publishedAt: string;
  brief: string;
  url: string;
  publication: HashnodePublication;
  coverImage: HashnodeCoverImage | null;
  tags: HashnodeTag[];
}

export interface HashnodePostEdge {
  node: HashnodePost;
}

export interface HashnodePageInfo {
  hasNextPage: boolean;
  endCursor: string | null;
}

export interface HashnodePosts {
  pageInfo: HashnodePageInfo;
  edges: HashnodePostEdge[];
}

export interface HashnodePublicationData {
  id: string;
  title: string;
  posts: HashnodePosts;
}

export interface HashnodeGetUserPostsResponse {
  publication: HashnodePublicationData | null;
}

// Request types
export interface GetUserPostsVariables {
  host: string;
  first: number;
  after?: string | null;
}

export interface SubscribeToNewsletterInput {
  publicationId: string;
  email: string;
}

export interface SubscribeToNewsletterVariables {
  input: SubscribeToNewsletterInput;
}

export interface SubscribeToNewsletterResponse {
  subscribeToNewsletter: {
    status: string;
  };
}

// User profile types (for bottom CTA)
export interface HashnodeUserBio {
  text: string;
}

export interface HashnodePublicationEdgeUrlNode {
  url: string;
}

export interface HashnodePublicationEdgesUrl {
  node: HashnodePublicationEdgeUrlNode;
}

export interface HashnodeUserPublications {
  edges: HashnodePublicationEdgesUrl[];
}

export interface HashnodeUser {
  username: string;
  profilePicture: string | null;
  bio: HashnodeUserBio | null;
  publications: HashnodeUserPublications;
}

export interface HashnodeGetUserResponse {
  user: HashnodeUser | null;
}

export interface GetUserVariables {
  username: string;
  pageSize: number;
  after?: string | null;
}

// API Response wrapper
export interface HashnodeApiResponse<T> {
  data: T | null;
  errors?: Array<{
    message: string;
    locations?: Array<{
      line: number;
      column: number;
    }>;
    path?: string[];
    extensions?: Record<string, unknown> & {
      code?: string;
      email?: string;
      publicationId?: string;
    };
  }>;
}
