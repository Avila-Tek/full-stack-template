export interface IRoute {
  text: string;
  href: string;
  as: string;
  privileges: string[];
  icon: JSX.Element;
}

export const routes: IRoute[] = [];
