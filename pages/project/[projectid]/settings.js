import { useState } from "react";
import { toast } from "react-toastify";
import Head from "next/head";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import ProjectNavigation from "/components/ProjectNavigation";

import SettingsGeneral from "../../../components/Settings/General";
import SettingsNewLocale from "../../../components/Settings/NewLocale";
import SettingsCurrentLocales from "../../../components/Settings/CurrentLocales";
import SettingsSecret from "../../../components/Settings/Secret";
import SettingsDanger from "../../../components/Settings/Danger";

const ProjectDetails = ({ project: _project }) => {
  const [project, setProject] = useState(_project);

  const refreshData = async () => {
    const { data, error } = await supabaseClient
      .from("projects")
      .select()
      .eq("id", project.id)
      .limit(1)
      .single();

    if (data) setProject(data);
    else toast.error(error.message);
  };

  return (
    <>
      <Head>
        <title>{project.name} settings</title>
      </Head>
      <div className="container mx-auto p-6">
        <ProjectNavigation id={project.id} />
        <div className="h-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <SettingsGeneral project={project} refreshData={refreshData} />
          <SettingsNewLocale project={project} refreshData={refreshData} />
          <SettingsCurrentLocales project={project} refreshData={refreshData} />
          <SettingsSecret project={project} refreshData={refreshData} />
          <SettingsDanger project={project} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { data, error } = await supabaseServerClient(ctx)
      .from("projects")
      .select()
      .eq("id", ctx.query.projectid)
      .limit(1)
      .single();

    if (error) {
      return {
        notFound: true,
        props: { error },
      };
    }

    return { props: { project: data } };
  },
});

export default ProjectDetails;
