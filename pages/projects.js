import ProjectItem from "../components/ProjectItem";
import {
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import { MODALS, useModal } from "../contexts/modal";

import Button from "../components/Button";
import NewProject from "../components/SidePanels/NewProject";
import PageHeading from "../components/PageHeading";
import PageContainer from "../components/PageContainer";

const Projects = ({ projects = [] }) => {
  const { currentModal, setCurrentModal } = useModal();

  return (
    <PageContainer>
      <PageHeading title="Your current projects">
        <Button onClick={() => setCurrentModal(MODALS.NEW_PROJECT)}>
          New Project
        </Button>
      </PageHeading>
      <div className="h-6" />
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      {currentModal === MODALS.NEW_PROJECT && (
        <NewProject maxProjects={2} currentProjects={projects.length} />
      )}
    </PageContainer>
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
