import { useState, type JSX } from "react";
import {
  Header,
  NavDropDownButton,
  NavMenuButton,
  PrimaryNav,
  Title,
  Menu,
  Button,
  Icon,
} from "@trussworks/react-uswds";

// Define types for navigation items
export interface NavLink {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface NavDropdown {
  label: string;
  isCurrent?: boolean;
  links: NavLink[];
}

export type NavItem = NavLink | NavDropdown;

export interface PageHeaderProps {
  title?: string;
  navItems?: NavItem[];
  user?: {
    email?: string | null;
    name?: string | null;
    image?: string | null;
  } | null;
}

const onToggle = (
  idx: number,
  setFn: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  setFn((prev) => {
    const newState = [...prev];
    newState[idx] = !newState[idx];
    return newState;
  });
};

export const PageHeader = ({
  title = "Project Title",
  navItems = [],
  user,
}: PageHeaderProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  // Initialize open state for dropdowns
  const [isOpen, setIsOpen] = useState<boolean[]>(
    new Array(navItems.filter((item) => "links" in item).length).fill(false)
  );

  // Handle login/logout
  const handleLogin = async () => {
    const { signIn } = await import("auth-astro/client");
    console.log("signIn");
    signIn("google");
  };

  const handleLogout = async () => {
    const { signOut } = await import("auth-astro/client");
    signOut();
  };

  // Convert navItems to the format expected by PrimaryNav
  const processedNavItems = navItems.map((item, index) => {
    if ("links" in item) {
      // This is a dropdown
      const dropdownIndex = navItems
        .slice(0, index)
        .filter((prevItem) => "links" in prevItem).length;

      const menuItems = item.links.map((link, linkIndex) => (
        <a
          href={link.href}
          key={linkIndex}
          className={link.isCurrent ? "usa-current" : undefined}
        >
          {link.label}
        </a>
      ));

      return (
        <div key={index}>
          <NavDropDownButton
            menuId={`navDropdown${index}`}
            onToggle={(): void => {
              onToggle(dropdownIndex, setIsOpen);
            }}
            isOpen={isOpen[dropdownIndex]}
            label={item.label}
            isCurrent={item.isCurrent}
          />
          <Menu
            items={menuItems}
            isOpen={isOpen[dropdownIndex]}
            id={`navDropdown${index}`}
          />
        </div>
      );
    } else {
      // This is a simple link
      return (
        <a
          href={item.href}
          key={index}
          className={`usa-nav__link ${item.isCurrent ? "usa-current" : ""}`}
        >
          <span>{item.label}</span>
        </a>
      );
    }
  });

  // Add user authentication section to navigation
  const authNavItem = user ? (
    <div key="user-auth" className="nav-dropdown">
      <NavDropDownButton
        menuId="userDropdown"
        onToggle={(): void => setUserDropdownOpen(!userDropdownOpen)}
        isOpen={userDropdownOpen}
        label={user.name || user.email || "User"}
      />
      <Menu
        items={[
          <button
            key="logout"
            onClick={handleLogout}
            className="usa-button usa-button--unstyled usa-nav__submenu-item logout-button"
          >
            <Icon.Logout
              aria-label="Logout"
              size={3}
              className="margin-right-1"
            />
            Sign Out
          </button>,
        ]}
        isOpen={userDropdownOpen}
        id="userDropdown"
      />
    </div>
  ) : (
    <Button
      key="login"
      type="button"
      onClick={handleLogin}
      className="usa-button usa-button--outline"
      style={{ marginLeft: "auto" }}
    >
      <Icon.Login aria-label="Login" />
      Sign In
    </Button>
  );

  const allNavItems = [...processedNavItems, authNavItem];

  return (
    <>
      <Header
        className="border-bottom border-width-025 border-primary-vivid"
        basic={true}
        showMobileOverlay={expanded}
      >
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
                {title}
              </a>
            </Title>
            <NavMenuButton onClick={onClick} label="Menu" />
          </div>
          <PrimaryNav
            items={allNavItems}
            mobileExpanded={expanded}
            onToggleMobileNav={onClick}
          />
        </div>
      </Header>
    </>
  );
};
