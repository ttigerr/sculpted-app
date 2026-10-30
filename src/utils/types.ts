import { Moment } from "moment";
export type NavigationType = {
  setOptions(arg0: { headerLeft: () => any; }): unknown;
  push: Function;
  navigate: Function;
  goBack: Function;
  dispatch: Function;
  reset: Function;
  getParent?: () => NavigationType | undefined;
};

export type NavigationPropsType = {
  navigation: NavigationType;
  route: {
    params?: {
      source?: string;
      [key: string]: any;
    };
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
  scheduledDate?: Date | number | null;
  title: string;
  description: string;
  isCompleted: boolean;
  isTemporary?: boolean;
  isSelected?: boolean;
};

export type DayListItem = {
  title: string;
  date: Moment | null;
  dateString: string | null;
};

export type JournalReminder = {
  time: string | null;
}

// REDUX STORE SLICES
// Date-like fields are stored as ISO strings so redux-persist can round-trip them.
// Convert at the UI edge with moment()/new Date() as needed.
export interface AuthState {
  token: string | null;
  tokenStartDate: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    gender?: 'Male' | 'Female' | 'Other' | null;
    birthday: string | null;
    profilePictureUrl?: string;
  };
  error: boolean | object | null;
  accountState: 'ACTIVE' | 'DELETED';
  sessionExpired: boolean;
}