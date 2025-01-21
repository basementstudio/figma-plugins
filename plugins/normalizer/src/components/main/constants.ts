import ColorsPage from "../../pages/colors-page";
import CommingSoonPage from "../../pages/comming-soon-page";
import FontsPage from "../../pages/fonts-page";
import ReplaceForVariablesPage from "../../pages/replace-for-variables-page";
import Icon from "../ui/icon";

export const ITEMS = [
  {
    id: "replace",
    label: "Replace for variables",
    icon: Icon.Replace,
    component: ReplaceForVariablesPage,
  },
  {
    divider: true,
    id: "divider-1",
  },
  {
    id: "colors",
    label: "Colors",
    icon: Icon.Colors,
    component: ColorsPage,
  },
  {
    id: "fonts",
    label: "Fonts",
    icon: Icon.Fonts,
    component: FontsPage,
  },
];
