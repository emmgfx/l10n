import { useState, useEffect } from "react";
import Head from "next/head";
import { toast } from "react-toastify";
import {
  supabaseClient,
  supabaseServerClient,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

import { useModal, MODALS } from "../../../contexts/modal";
import { getLanguageNativeName } from "../../../utils/languages";

import Button from "../../../components/Button";
import ProjectNavigation from "../../../components/ProjectNavigation";
import ModalTranslationNew from "../../../components/modals/ModalTranslationNew";
import TranslationEditor from "../../../components/SidePanels/TranslationEditor";

import IconPencilOutline from "../../../public/images/icons/pencil-outline.svg";
import IconDotsVertical from "../../../public/images/icons/dots-vertical.svg";
import KeyEditor from "../../../components/SidePanels/KeyEditor";

const ProjectDetails = ({ project }) => {
  const { currentModal, setCurrentModal } = useModal();
  const [editingKey, setEditingKey] = useState(null);
  const [editingLocale, setEditingLocale] = useState(null);
  const [editingTranslation, setEditingTranslation] = useState(null);
  const [translations, setTranslations] = useState([]);

  const fetchTranslations = async () => {
    const { data, error } = await supabaseClient
      .from("locales_grouped")
      .select()
      .eq("project", project.id)
      .order("key", { ascending: true });
    if (error) toast.error(error.message);
    else setTranslations(data);
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  return (
    <>
      <Head>
        <title>{project.name} translations</title>
      </Head>
      <div className="container mx-auto p-6">
        <div className="flex justify-between">
          <ProjectNavigation id={project.id} />
          <Button
            className="grow-0"
            onClick={() => setCurrentModal(MODALS.NEW_TRANSLATION)}
          >
            New translation
          </Button>
        </div>
        <div className="h-6" />

        <div className="overflow-auto h-fit">
          <table className="relative w-full border-separate border-spacing-1">
            <thead className="">
              <tr>
                <th className="border border-slate-300 bg-slate-100 font-semibold p-4 rounded-sm text-slate-900 text-left">
                  Keyword
                </th>
                {project.locales.map((locale, index) => (
                  <th
                    key={index}
                    className="border border-slate-300 bg-slate-100 font-semibold p-4 rounded-sm text-slate-900 text-left min-w-[25vw]"
                  >
                    {getLanguageNativeName(locale)} ({locale})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {translations.map((translation) => (
                <tr
                  key={translation.key}
                  className="transition hover:bg-slate-100"
                >
                  <td className="border border-slate-300 rounded-sm p-4 text-slate-500 font-mono">
                    <div className="flex items-center justify-between gap-2">
                      {translation.key}
                      <button
                        className="bg-white p-2 text-gray-400"
                        onClick={() => {
                          setEditingKey(translation.key);
                          setCurrentModal(MODALS.EDIT_KEY);
                        }}
                      >
                        <IconDotsVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                  {project.locales.map((locale) => (
                    <td
                      key={locale}
                      className="border border-slate-300 rounded-sm p-4 text-slate-500"
                    >
                      <div className="flex justify-between items-center">
                        <span className="line-clamp-3">
                          {translation.locales[locale]}
                        </span>
                        <button
                          onClick={() => {
                            setEditingLocale(locale);
                            setEditingTranslation(translation);
                            setCurrentModal(MODALS.EDIT_TRANSLATION);
                          }}
                          className="bg-white p-2 text-gray-400"
                        >
                          <IconPencilOutline className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {currentModal === MODALS.NEW_TRANSLATION && (
        <ModalTranslationNew
          project={project}
          fetchTranslations={fetchTranslations}
        />
      )}
      {currentModal === MODALS.EDIT_TRANSLATION && (
        <TranslationEditor
          project={project}
          translation={editingTranslation}
          locale={editingLocale}
          fetchTranslations={fetchTranslations}
        />
      )}
      {currentModal === MODALS.EDIT_KEY && (
        <KeyEditor
          project={project}
          keyword={editingKey}
          fetchTranslations={fetchTranslations}
        />
      )}
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
