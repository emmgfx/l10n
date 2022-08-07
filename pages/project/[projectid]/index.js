import { useEffect, useState } from "react";
import Head from "next/head";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import ProjectNavigation from "../../../components/ProjectNavigation";
import LanguageChip from "../../../components/LanguageChip";
import PageHeading from "../../../components/PageHeading";
import PageContainer from "../../../components/PageContainer";

const Project = ({ project }) => {
  const [translations, setTranslations] = useState([]);
  const [baseUrl, setBaseUrl] = useState("");

  const fetchTranslations = async () => {
    const { data, error } = await supabaseClient
      .from("locales_grouped")
      .select()
      .eq("project", project.id);
    if (error) toast.error(error.message);
    else setTranslations(data);
  };

  useEffect(() => {
    fetchTranslations();
    setBaseUrl(window.location.protocol + "//" + window.location.host);
  }, []);

  return (
    <>
      <Head>
        <title>{project.name} overview</title>
      </Head>
      <PageContainer>
        <PageHeading title={`${project.name} overview`}>
          <ProjectNavigation id={project.id} />
        </PageHeading>
        <div className="h-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold">
              Available API requests for this project:
            </h4>
            <div className="h-6" />

            <div>
              <ul className="font-mono text-xs">
                <li className="mb-2">
                  <a
                    href={`${baseUrl}/api/project/${project.id}/messages/index.json?secret=${project.secret_key}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="items-center gap-2 bg-emerald-300 inline-flex drop-shadow p-1 rounded-full pr-3"
                  >
                    <LanguageChip arbitray="Index" />
                    /api/project/{project.id}
                    /messages/index.json?secret={"<secret_key>"}
                  </a>
                </li>

                {project.locales.map((iso) => (
                  <li className="mb-2" key={iso}>
                    <a
                      href={`${baseUrl}/api/project/${project.id}/messages/${iso}.json?secret=${project.secret_key}`}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="items-center gap-2 bg-emerald-300 inline-flex drop-shadow p-1 rounded-full pr-3"
                    >
                      <LanguageChip iso={iso} />
                      /api/project/{project.id}
                      /messages/{iso}.json?secret={"<secret_key>"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-semibold">General project statics:</h4>
            <div className="h-6" />

            <ul className="list-disc list-inside">
              <li>
                This project has <strong>{translations.length}</strong>{" "}
                translations in <strong>{project.locales.length}</strong>{" "}
                locales.
              </li>
              <li>
                <strong>100%</strong> completed (0 translations remaining).
              </li>
              <li>
                Default locale: <strong>{project.default_locale}</strong>
              </li>
              <li>
                Available locales: <strong>{project.locales.join(", ")}</strong>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
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

export default Project;
