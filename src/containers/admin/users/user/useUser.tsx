import { useCallback, useEffect, useState } from "react";
import { IUserShortInfo } from "@/services/user-service/interfaces/user-short-info.interface";
import userService from "@/services/user-service/user.service";
import { useRouter } from "next/router";
import { IModerator } from "@/services/user-service/interfaces/moderator.interface";
import { useForm } from "react-hook-form-mui";
import {
  IBlockUserForm,
  IModeratorForm,
} from "@/containers/admin/users/user/interfaces";

const useUser = (id: number) => {
  const router = useRouter();
  const query = router.query as { id: string };

  const [user, setUser] = useState<IUserShortInfo | null>(null);
  const [moderator, setModerator] = useState<IModerator | null>(null);

  const [blockLoading, setBlockLoading] = useState(false);
  const [moderatorLoading, setModeratorLoading] = useState(false);

  const blockForm = useForm<IBlockUserForm>({
    defaultValues: {
      reason: "",
      blockEndDate: null as any,
    },
    mode: "onChange",
  });

  const moderatorForm = useForm<IModeratorForm>({
    defaultValues: {
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const handleBlockUser = useCallback(() => {
    blockForm.handleSubmit((data) => {
      console.log(data);
      // if (blockLoading) return
      // setBlockLoading(true)
    })();
  }, [blockLoading]);

  const handleUnblockUser = useCallback(() => {
    console.log("unblock");
  }, []);

  const handleSaveModerator = useCallback(() => {
    moderatorForm.handleSubmit((data) => {
      console.log(data);
      // if (moderatorLoading) return
      // setModeratorLoading(true)
    })();
  }, [moderatorLoading]);

  const handleRemoveModerator = useCallback(() => {
    console.log("remove moderator");
  }, []);

  useEffect(() => {
    // get user
    userService
      .getUserDataForAdmin(id)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
    // get moderator
    userService
      .getModeratorDataForAdmin(id)
      .then(({ data }) => {
        setModerator(data);
      })
      .catch(() => {
        setModerator(null);
      });
  }, [query.id]);

  return {
    user,
    moderator,
    moderatorForm,
    blockForm,
    handleBlockUser,
    handleSaveModerator,
    handleUnblockUser,
    handleRemoveModerator,
    moderatorLoading,
    blockLoading,
  };
};

export default useUser;
