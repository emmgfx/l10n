import { useState } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { useModal } from "../../contexts/modal";

import Button from "../Button";
import Input from "../Input";
import SidePanel from "../SidePanel";

const KeyEditor = ({ project, keyword: key, fetchTranslations }) => {
  const [loading, setLoading] = useState(false);
  const { clearCurrentModal } = useModal();

  const { register, handleSubmit, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      newString: key,
    },
  });

  const onClose = () => clearCurrentModal();

  const onSubmit = async (data) => {
    setLoading(true);

    const { data: response, error } = await supabaseClient
      .from("locales")
      .update({ key: data.newString })
      .eq("project", project.id)
      .eq("key", key);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`${key} updated to ${data.newString}`);
      fetchTranslations();
      onClose();
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-end items-center animate-in fade-in"
      onClick={onClose}
    >
      <SidePanel onClose={onClose}>
        <SidePanel.Header>
          <div className="flex items-center gap-3">Update key</div>
        </SidePanel.Header>
        <SidePanel.Content>
          <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-xs font-semibold uppercase text-gray-600">
              New key
            </label>
            <Input type="text" {...register("newString")} autoFocus />
            <div className="h-2" />
            <div className="text-xs">
              Updating key{" "}
              <span className="font-mono bg-red-100 text-red-800 p-1 rounded">
                {key}
              </span>{" "}
              to{" "}
              <span className="font-mono bg-green-100 text-green-800 p-1 rounded">
                {watch("newString")}
              </span>
            </div>
          </form>
        </SidePanel.Content>
        <SidePanel.Footer>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </SidePanel.Footer>
      </SidePanel>
    </div>
  );
};

export default KeyEditor;
