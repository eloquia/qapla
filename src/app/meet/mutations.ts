import { gql } from "apollo-angular";

export const UPDATE_MEETING_ITEM = gql`
  mutation UpdateMeetingItem($updateMeetingItemRequest: UpdateMeetingItemRequest!) {
    updateMeetingItem(input: $updateMeetingItemRequest) {
      id
    }
  }
`;
