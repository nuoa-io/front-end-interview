import { Button } from "@mui/material";
import { useCallback } from "react";
import { useFetch } from "use-http";
import { CallbackSuccess } from "./user.type";
import { toast } from "react-toastify";

export default function ButtonDeleteUser({
  id,
  callbackSuccess,
}: {
  id: number;
  callbackSuccess: CallbackSuccess;
}) {
  const { delete: deleteUser, loading } = useFetch(`/api/users/${id}`);

  const handleDelete = useCallback(async () => {
    const response = await deleteUser();

    if (response === "OK") {
      callbackSuccess && callbackSuccess();
      toast("Created successfully!");
      return;
    }
    toast("Created Failure!", { type: "error" });
  }, [callbackSuccess, deleteUser]);

  return (
    <Button disabled={loading} onClick={handleDelete}>
      Delete
    </Button>
  );
}
