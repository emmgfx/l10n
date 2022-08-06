import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Button from "../Button";
import Card from "../Card";

const SettingsGeneral = ({ project, refreshData = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState(project.name);

  useEffect(() => {
    if (!project) return;
    setNewName(project.name);
  }, [project.name]);

  const changeProjectName = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabaseClient
      .from("projects")
      .update({ name: newName })
      .match({ id: project.id });

    if (error) {
      toast.error(error.message);
    } else {
      await refreshData();
      toast.success("Project name changed");
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Header>General</Card.Header>
        <Card.Body>
          <form onSubmit={changeProjectName}>
            <div className="flex items-center gap-4 justify-between">
              <label htmlFor="name" className="w-1/3">
                Project name
              </label>
              <input
                id="name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Project name"
                disabled={loading}
                className="
                    mt-1
                    block
                    w-full
                    rounded
                    border-gray-300
                    shadow-sm
                    focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              />
            </div>
            <div className="h-3" />
            <div className="text-right">
              <Button disabled={loading} type="submit">
                Update name
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsGeneral;
