// components/Layout/Layout.tsx
import { ReactNode } from "react";
import "./layout-styles.scss";
import { SideDrawer } from "..";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout__container">
      <SideDrawer />
      <main className="layout__content">{children}</main>
    </div>
  );
};

export default Layout;
