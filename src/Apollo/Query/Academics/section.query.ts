import { gql } from "@apollo/client";

export const ADD_SECTION = gql`
mutation addSection($sectionInput: SectionInput!) {
    addSection(sectionInput: $sectionInput) {
      success
      message
    }
}
`;

export const GET_SECTION_LIST = gql`
query getSections($searchInput: SearchInput!) {
  getSections(searchInput: $searchInput) {
    id
    name
  }
}
`;

export const DELETE_SECTION_LIST = gql`
mutation deleteSection($deleteSectionId: String!) {
  deleteSection(id: $deleteSectionId) {
    success
    message
  }
}
`;