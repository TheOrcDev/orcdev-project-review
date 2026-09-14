export const menuItems = [
  {
    href: "/submit-project",
    label: "SUBMIT PROJECT",
  },
  {
    href: "/livestreams",
    label: "LIVESTREAMS",
  },
  {
    href: "/orc-machine",
    label: "THE ORC MACHINE",
  },
  {
    href: "/reviewed-projects",
    label: "REVIEWED PROJECTS",
  },
];

export const commandMenuGroups = [
  {
    heading: "Pages",
    items: [{ href: "/", label: "HOME" }, ...menuItems],
  },
  {
    heading: "More",
    items: [
      { href: "/stats", label: "STATS" },
      { href: "/login", label: "LOGIN" },
      { href: "/admin", label: "ADMIN" },
      { href: "/vote", label: "VOTE" },
    ],
  },
];
