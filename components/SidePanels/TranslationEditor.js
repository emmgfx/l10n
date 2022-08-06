import { useState } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useForm } from "react-hook-form";

import { useModal } from "../../contexts/modal";

import Button from "../Button";
import SidePanel from "../SidePanel";
import Textarea from "../Textarea";

const TranslationEditor = ({
  project,
  locale,
  translation,
  fetchTranslations,
}) => {
  const [loading, setLoading] = useState(false);
  const { clearCurrentModal } = useModal();

  const { register, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      newString: translation.locales[locale],
    },
  });

  const onClose = () => {
    if (edited)
      if (!confirm("Are you sure you want to discard your changes?")) return;
    clearCurrentModal();
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const { data: response, error } = await supabaseClient
      .from("locales")
      .update({ value: data.newString })
      .eq("project", project.id)
      .eq("key", translation.key)
      .eq("locale", locale);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`${translation.key} updated`);
      fetchTranslations();
      clearCurrentModal();
    }

    setLoading(false);
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-end items-center animate-in fade-in"
    >
      <SidePanel>
        <SidePanel.Header>
          <div className="flex items-center gap-3">
            <span className="font-mono">{translation.key}</span>
          </div>
        </SidePanel.Header>
        <SidePanel.Content>
          <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              autoFocus
              {...register("newString")}
              className="h-full"
              disabled={loading}
            />
          </form>
        </SidePanel.Content>
        <SidePanel.Footer>
          <Button disabled={loading}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </SidePanel.Footer>
      </SidePanel>
    </div>
  );
};

export default TranslationEditor;
