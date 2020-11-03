import { gql } from '@apollo/client';

export const GET_NOTIFICATION_COUNT = gql`
  query GET_NOTIFICATION_COUNT($filter: FilterNotificationInput!) {
    notificationCount(filter: $filter)
  }
`;

export const GET_NOTIFICATIONS = gql`
  query GET_NOTIFICATIONS($filter: FilterFindManyNotificationInput!) {
    notifications(filter: $filter) {
      _id
      name
      message
      type
      active
      createdAt
    }
  }
`;
