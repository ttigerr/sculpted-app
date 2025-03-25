import { Moment } from "moment";
export type NavigationType = {
  navigate: Function;
  goBack: Function;
  dispatch: Function;
  reset: Function;
};

export type NavigationPropsType = {
  navigation: NavigationType;
  route: {
    params: any;
    key: string;
    name: string;
  };
};

export type OtpValue = [string, string, string, string];

export type Color = {
  offset: string;
  color: string;
  opacity: string;
}

export type Task = {
  id: string;
  creationDate: Date | number;
  scheduledDate: Date | number;
  title: string;
  description: string;
  isCompleted: boolean;
  isTemporary?: boolean;
  isSelected?: boolean;
};

export type DayListItem = {
  title: string;
  date: Moment | null;
};

// REDUX STORE SLICES
export interface AuthState {
  token: string | null;
  tokenStartDate: Date | undefined;
  user: {
    id: string;
    name: string;
    email: string;
    gender?: 'Male' | 'Female' | 'Other' | null;
    birthday: Date | null;
    profilePictureUrl?: string; 
  };
  error: boolean | object | null;
  accountState: 'ACTIVE' | 'DELETED';
  sessionExpired: boolean;
}