//Add Section
export interface AddSectionData {
  addSection: {
    success: boolean;
    message: string;
  }
}

//Section
export interface Section {
  id: string;
  name: string;
  createdBy: {
    name: string;
    phone: string;
  }
}

//Get Section
export interface GetSectionListData {
  getSections: Section[];
}

//Delete Section
export interface DeleteSectionData {
  deleteSection: {
    success: boolean;
    message: string;
  }
}
