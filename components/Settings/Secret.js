import { useState } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { rnd } from "../../utils/rnd";

import Button from "../Button";
import Card from "../Card";
import Input from "../Input";

const SettingsSecret = ({ project, refreshData = async () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const confirmIntent = () =>
    window.confirm(
      "Refreshing your secret key may result in a lost of access to our API."
    );

  const refreshSecretKey = async () => {
    if (!confirmIntent()) return;

    setLoading(true);

    const { data, error } = await supabaseClient
      .from("projects")
      .update({ secret_key: rnd(32) })
      .match({ id: project.id });

    if (error) {
      toast.error(error.message);
    } else {
      await refreshData();
      toast.success("Secret updated");
    }

    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Header>Secret key</Card.Header>
        <Card.Body>
          <div className="flex items-center gap-4 justify-between">
            <Input
              id="name"
              type={visible ? "text" : "password"}
              value={project.secret_key}
              readOnly
              className="
                    mt-1
                    block
                    w-full
                    rounded
                    border-gray-300
                    bg-gray-100
                    text-gray-700
                    shadow-sm
                    focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="h-3" />
          <div className="flex justify-between">
            <Button onClick={() => setVisible(!visible)} className="grow-0">
              {visible ? "Hide" : "Show"} key
            </Button>
            <Button
              disabled={loading}
              type="button"
              onClick={refreshSecretKey}
              className="grow-0"
            >
              {loading ? "Refreshing" : "Refresh"} secret key
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsSecret;
