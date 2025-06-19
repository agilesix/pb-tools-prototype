import { useState, type JSX } from "react";
import {
  Header,
  NavDropDownButton,
  NavMenuButton,
  PrimaryNav,
  Title,
  Menu,
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
}: PageHeaderProps): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded);

  // Initialize open state for dropdowns
  const [isOpen, setIsOpen] = useState<boolean[]>(
    new Array(navItems.filter((item) => "links" in item).length).fill(false)
  );

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

  return (
    <>
      <Header basic={true} showMobileOverlay={expanded}>
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
            items={processedNavItems}
            mobileExpanded={expanded}
            onToggleMobileNav={onClick}
          />
        </div>
      </Header>
    </>
  );
};
