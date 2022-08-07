import Router from "next/router";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Button from "../Button";
import Card from "../Card";

const SettingsDanger = ({ project }) => {
  const confirmIntent = () =>
    window.confirm(
      "Deleting this project would remove all his data. This action is not reversible."
    );

  const confirmName = () =>
    project.name ===
    window.prompt(
      "To avoid errors, please write the project name to confirm his permanent removal"
    );

  const deleteProjectLocales = async () => {
    const { error } = await supabaseClient
      .from("locales")
      .delete()
      .match({ project: project.id });
    return { error };
  };

  const deleteProjectPermissions = async () => {
    const { error } = await supabaseClient
      .from("permissions")
      .delete()
      .match({ project_id: project.id });
    return { error };
  };

  const deleteProject = async () => {
    if (!confirmIntent()) return;
    if (!confirmName()) {
      toast.warning("Invalid name check. Project not removed.");
      return;
    }

    const { error: localesError } = await deleteProjectLocales();

    if (localesError) {
      toast.error("Error removing locales");
      return;
    }

    const { error: permissionsError } = await deleteProjectPermissions();

    if (permissionsError) {
      toast.error("Error removing permissions");
      return;
    }

    const { error: projectError } = await supabaseClient
      .from("projects")
      .delete()
      .match({ id: project.id });

    if (projectError) {
      toast.error("Error removing project");
      return;
    }

    toast.success("Project removed");
    Router.push("/");
  };

  return (
    <>
      <Card>
        <Card.Header>Danger zone</Card.Header>
        <Card.Body>
          <p className="mb-2 text-sm font-semibold text-red-600">
            Deleting a project is an irreversible action. When you delete the
            project all his data would be removed instantly without any chance
            to recover it or undo the action.
          </p>
          <p className="mb-2 text-sm">
            To ensure that you don`&apos;t delete a project by accident, we
            would request you to write the project name as an intent
            confirmation.
          </p>
          <Button onClick={deleteProject}>Delete project</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsDanger;
