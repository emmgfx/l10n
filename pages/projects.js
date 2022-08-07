import ProjectItem from "../components/ProjectItem";

import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import Button from "../components/Button";
import { MODALS, useModal } from "../contexts/modal";
import NewProject from "../components/SidePanels/NewProject";

const Projects = ({ projects }) => {
  const { currentModal, setCurrentModal } = useModal();

  return (
    <div className="py-6 px-8">
      <div className="container mx-auto">
        <section className="">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl text-gray-800">
              Your current projects
            </h1>
            <Button
              className="grow-0"
              onClick={() => setCurrentModal(MODALS.NEW_PROJECT)}
            >
              New Project
            </Button>
          </div>
          <div className="h-6" />
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        </section>
        {currentModal === MODALS.NEW_PROJECT && <NewProject />}
      </div>
    </div>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { data } = await supabaseServerClient(ctx).from("projects").select();
    return {
      props: {
        projects: data,
      },
    };
  },
});

export default Projects;
