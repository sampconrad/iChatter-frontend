import { Message } from "graphql-ws";

/**
 * Users
 */
export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUser>;
}

export interface SearchedUser {
  id: string;
  username: string;
  image: string;
}

/**
 * Conversations
 */
export interface ConversationsData {
  conversations: Array<ConversationPopulated>;
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}

export interface CreateConversationInput {
  participantIds: Array<string>;
}

export interface ConversationUpdatedData {
  conversationUpdated: {
    conversation: ConversationPopulated;
  };
}

export interface ConversationDeletedData {
  conversationDeleted: {
    id: string;
  };
}

/**
 * Messages
 */
export interface MessagesData {
  messages: Array<MessagePopulated>;
}

export interface MessagesVariables {
  conversationId: string;
}

export interface MessageSubscriptionData {
  subscriptionData: {
    data: {
      messageSent: MessagePopulated;
    };
  };
}

export type ParticipantPopulated = {
  id: string
  hasSeenLatestMessage: boolean,
  user: {
      id: string,
      username: string,
      image: string,
  },
}

export type ConversationPopulated = {
  id: string,
  updatedAt: Date
  participants: Array<ParticipantPopulated>,
  latestMessage: {
    id: string
    body: string
    createdAt: Date
    sender: {
        id: string,
        username: string,
        image: string,
    },
  },
}

export type MessagePopulated = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: Date
  updatedAt: Date
  sender: {
      id: string,
      username: string,
      image: string,
  },
}

export interface SendMessageArguments {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
}

