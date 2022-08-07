import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { useModal } from "../../contexts/modal";
import { isValidLanguage } from "../../utils/languages";

import Button from "../Button";
import SidePanel from "../SidePanel";
import Label from "../Label";
import Input from "../Input";

const NewProject = ({}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors, dirtyFields },
  } = useForm({ mode: "onChange" });
  const router = useRouter();
  const { clearCurrentModal } = useModal();

  useEffect(
    () => setValue("defaultLocale", navigator.language, { shouldDirty: false }),
    []
  );

  const onClose = () => {
    if (Object.keys(dirtyFields).length > 0)
      if (!confirm("Are you sure you want to discard your changes?")) return;
    clearCurrentModal();
  };

  const onSubmit = async (formData) => {
    const {
      data: [project],
      error,
    } = await supabaseClient.from("projects").insert({
      name: formData.name,
      default_locale: formData.defaultLocale,
      locales: [formData.defaultLocale],
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Project created!");
    router.push(`/project/${project.id}`);
  };
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 w-full h-full bg-black/30 flex justify-end items-center animate-in fade-in"
    >
      <SidePanel onClose={onClose}>
        <SidePanel.Header>Create new project</SidePanel.Header>
        <SidePanel.Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="name">Project name</Label>
            <Input
              id="name"
              type="text"
              {...register("name", {
                required: true,
                minLength: 2,
                maxLength: 36,
              })}
              placeholder="Your project name"
              error={dirtyFields.name && errors.name}
              autoFocus
            />
            <div className="h-2" />
            <Label htmlFor="defaultLocale">Default locale</Label>
            <Input
              id="defaultLocale"
              type="text"
              {...register("defaultLocale", {
                required: true,
                validate: isValidLanguage,
              })}
              placeholder="Default locale"
              error={dirtyFields.defaultLocale && errors.defaultLocale}
            />
            <button className="hidden" />
          </form>
        </SidePanel.Content>
        <SidePanel.Footer>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={!isValid}>
            Save
          </Button>
        </SidePanel.Footer>
      </SidePanel>
    </div>
  );
};

export default NewProject;
