import { useEffect, useRef, useState } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { InferType } from "yup";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PageNotFound from "./PageNotFound";

import { profileSchema } from "../validations/profileSchema";

import { axiosInstance } from "../api/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";
import CustomInput from "../components/CustomInput";

type IProfileValues = InferType<typeof profileSchema>;

const Profile = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<File | string | null>(
    null
  );
  const { userData, setUserData } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userData) return;

    setProfilePicture(userData?.profilePicture ?? null);
  }, [userData]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IProfileValues>({
    resolver: yupResolver(profileSchema) as Resolver<IProfileValues>,
  });

  const resetChanges = () => {
    reset({
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      username: userData?.username,
    });
    setProfilePicture(userData?.profilePicture ?? null);
  };

  const fileInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files[0]) {
      setProfilePicture(files[0]);
      setValue("profilePicture", files[0], { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<IProfileValues> = async (values) => {
    toast.loading("Updating profile...");
    setSubmitting(true);
    try {
      const formValues = new FormData();

      formValues.append("firstName", values.firstName);
      formValues.append("lastName", values.lastName);
      formValues.append("username", values.username);

      if (profilePicture) {
        formValues.append("profilePicture", profilePicture);
      }

      const response = await axiosInstance.put("/user/profile", formValues);
      toast.dismiss();
      toast.success("Profile updated successfully!", { autoClose: 4000 });
      setUserData(response.data?.user);
      localStorage.setItem("userData", JSON.stringify(response.data?.user));
    } catch (error) {
      handleAxiosError(error, "Failed to update profile!");
    } finally {
      setSubmitting(false);
    }
  };

  const removeProfilePicture = () => {
    if (fileInputRef.current?.files) {
      fileInputRef.current.value = "";
      setValue("profilePicture", null, { shouldValidate: true });
      setProfilePicture(null);
    }
  };

  if (!userData) return <PageNotFound />;

  return (
    <>
      <Header />
      <main className="p-6 sm:px-[5%] py-10 gap-5 items-center justify-center text-text-primary">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full sm:w-[500px] rounded-lg drop-shadow-[4px, 0px, 4px] drop-shadow-primary"
        >
          <h1 className="text-[26px] text-center font-semibold">
            Edit Profile
          </h1>

          <div className="self-center relative">
            <img
              title="Change Profile Picture"
              onClick={() => fileInputRef.current?.click()}
              src={
                profilePicture instanceof File
                  ? URL.createObjectURL(profilePicture)
                  : typeof profilePicture === "string"
                  ? profilePicture
                  : "/blank-pfp.webp"
              }
              alt=""
              className="rounded-full size-[100px] cursor-pointer my-4 shrink-0 object-center object-cover"
            />
            <button
              type="button"
              onClick={removeProfilePicture}
              title="Remove Profile Picture"
              className="bg-red-700 rounded-full cursor-pointer absolute bottom-6 -right-0 p-0.5 text-xl text-white"
            >
              <RxCross2 />
            </button>
          </div>

          <input
            type="file"
            ref={(e) => {
              register("profilePicture").ref(e); // Register with RHF
              fileInputRef.current = e; // Assign to custom ref
            }}
            className="hidden"
            accept=".png, .jpeg, .jpg, .avif, .webp"
            onChange={fileInputOnChange}
          />

          {errors.profilePicture?.message && (
            <p className="text-red-500 text-sm w-full text-center">
              {errors.profilePicture?.message}
            </p>
          )}

          <CustomInput
            register={register}
            name="firstName"
            placeholder="Example: John"
            labelText="First Name:"
            type="text"
            value={userData?.firstName}
            errorMessage={errors.firstName?.message}
          />
          <CustomInput
            register={register}
            name="lastName"
            placeholder="Example: Doe"
            labelText="Last Name:"
            type="text"
            value={userData?.lastName}
            errorMessage={errors.lastName?.message}
          />
          <CustomInput
            register={register}
            name="username"
            placeholder="Example: johndoe123"
            labelText="Username (must be unique):"
            type="text"
            value={userData?.username}
            errorMessage={errors.username?.message}
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 text-md font-semibold cursor-pointer text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Update Profile
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={resetChanges}
            className="text-md font-semibold cursor-pointer text-primary-txt  bg-primary/60 px-4 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Reset changes
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
};
export default Profile;
