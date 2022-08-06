import Button from "./Button";

import IconViewDashboardVariant from "../public/images/icons/view-dashboard-variant.svg";
import IconTranslate from "../public/images/icons/translate.svg";
import IconTuneVertical from "../public/images/icons/tune-vertical.svg";

const ProjectNavigation = ({ id }) => {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Button href={`/project/${id}`} className="flex gap-2 items-center">
            <IconViewDashboardVariant className="w-4 h-4" />
            Overview
          </Button>
        </li>
        <li>
          <Button
            href={`/project/${id}/translations`}
            className="flex gap-2 items-center"
          >
            <IconTranslate />
            Translations
          </Button>
        </li>
        <li>
          <Button
            href={`/project/${id}/settings`}
            className="flex gap-2 items-center"
          >
            <IconTuneVertical />
            Settings
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default ProjectNavigation;
