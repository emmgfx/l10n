import Link from "next/link";

import LanguageChipList from "./LanguageChipList";

const ProjectItem = ({ project }) => {
  return (
    <Link href={`project/${project.id}`}>
      <a>
        <article className="bg-gray-100 py-6 px-8 hover:bg-gray-200 rounded-lg">
          <h1 className="font-semibold">{project.name}</h1>
          <div className="h-2" />
          <div>
            <LanguageChipList isos={project.locales} />
          </div>
        </article>
      </a>
    </Link>
  );
};

export default ProjectItem;
