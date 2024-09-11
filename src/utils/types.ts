
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