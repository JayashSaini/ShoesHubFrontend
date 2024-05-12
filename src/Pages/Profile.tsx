import profileBg from "@/assets/profileBG.jpg";
import { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { ApiCall } from "@/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/types/state";
import { GoPlus } from "react-icons/go";
import { PrimaryButton, Input } from "@/Components";
import { updateAvatar, logout } from "@/features/auth";
import { initCart } from "@/features/cart";
import { initProfile } from "@/features/profile";
import { toast } from "sonner";
import { setProfile } from "@/features/profile";
import { useNavigate } from "react-router-dom";
import { initWishlist } from "@/features/wishlist";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const avatar: any = useSelector((state: RootState) => state.user.user.avatar);
  const { firstName, lastName, phone, email } = useSelector(
    (state: RootState) => state.profile
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updateFirstName, setUpdateFirstName] = useState("");
  const [updateLastName, setUpdateLastName] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");

  const handleSave = async () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(",")[1];
        ApiCall({
          url: "/api/v1/users/update-avatar",
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          data: { data: base64String },
        })
          .then((response) => {
            if (response.data) {
              dispatch(updateAvatar(response.data.data.avatar.url));
              toast.success("Avatar update successfully");
            } else {
              toast.error("Error while updating the avatar");
            }
          })
          .catch(() => {
            toast.error("Error while updating the avatar");
          });
      };
      reader.readAsDataURL(selectedFile);
    }

    let data = {};
    if (updateFirstName && updateFirstName.trim() !== "") {
      if (updateFirstName.length < 3) {
        toast.error("First name must be at least 3 characters long");
        return;
      }
      if (!/^[a-zA-Z ]+$/.test(updateFirstName)) {
        toast.error("First name must contain only letters and spaces");
        return;
      }
      data = { ...data, firstName: updateFirstName };
      setUpdateFirstName("");
    }

    if (updateLastName && updateLastName.trim() !== "") {
      if (updateLastName.length < 3) {
        toast.error("Last name must be at least 3 characters long");
        return;
      }
      if (!/^[a-zA-Z ]+$/.test(updateLastName)) {
        toast.error("Last name must contain only letters and spaces");
        return;
      }
      data = { ...data, lastName: updateLastName };
      setUpdateLastName("");
    }

    if (updatePhone && updatePhone.trim() !== "") {
      if (updatePhone.length !== 10 || !/^\d+$/.test(updatePhone)) {
        toast.error("Phone number must be 10 digits long");
        return;
      }
      data = { ...data, phoneNumber: updatePhone };
      setUpdatePhone("");
    }

    if (updateEmail && updateEmail.trim() !== "") {
      data = { ...data, email: updateEmail };
      setUpdateEmail("");
    }
    if (Object.keys(data).length > 0) {
      ApiCall({
        url: "/api/v1/profile",
        method: "PATCH",
        data,
      })
        .then((response: any) => {
          if (response.data) {
            const { firstName, lastName, email, phoneNumber } =
              response.data.data;

            dispatch(setProfile({ firstName, lastName, email, phoneNumber }));
            toast.success("Profile update successfully");
            return;
          }
          if (response.error) {
            toast.error(response.error.message);
            return;
          }
        })
        .catch(() => {
          toast.error("Error while updating the profile");
        });
    }
  };

  const handleFileUpload = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsEditing(true);
  };

  const logoutHandler = () => {
    ApiCall({
      url: "/api/v1/users/logout",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data) {
          dispatch(logout());
          dispatch(initCart());
          dispatch(initWishlist());
          dispatch(initProfile());
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          navigate("/login");
        } else {
          toast.error("Error while logging out");
        }
      })
      .catch(() => {
        toast.error("Error while logging out");
      });
  };
  return (
    <div>
      <div className="w-full md:h-[90vh] md:py-0 py-16 md:flex block">
        <div className=" w-1/2 h-full md:block hidden">
          <img src={profileBg} alt="" className="h-full w-full" />
        </div>
        <div className="md:w-1/2 w-full h-full md:flex block justify-center items-center flex-col">
          <div className="md:w-[75%] w-full md:px-3 px-5 ">
            <div className="w-full flex justify-start gap-2 items-center ">
              <div className=" relative w-auto flex flex-col justify-center items-center">
                {isEditing ? (
                  <AvatarEditor
                    ref={editorRef}
                    image={selectedFile}
                    width={130}
                    height={130}
                    border={5}
                    color={[255, 255, 255]} // RGBA
                    scale={1.5}
                    rotate={0}
                    crossOrigin="anonymous"
                    borderRadius={3}
                  />
                ) : (
                  <>
                    <div>
                      <img
                        src={avatar.url}
                        alt="image"
                        className="w-[130px] h-[140px] rounded-lg"
                      />
                    </div>
                  </>
                )}

                <div
                  className={`flex justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {!isEditing && (
                      <GoPlus className="w-20 h-20 text-black  opacity-40" />
                    )}
                  </label>
                </div>
              </div>
              <div className="main-heading-font lg:text-6xl md:text-4xl text-3xl text-gray-800  ">
                Update <br /> Profile
              </div>
            </div>
            <div className="w-full h-auto">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();

                  await handleSave();
                  setIsEditing(false);
                }}>
                <Input
                  label="First Name"
                  onChange={(e) => {
                    setUpdateFirstName(e.target.value);
                  }}
                  type="text"
                  placeholder={firstName}
                  value={updateFirstName}
                  isRequired={false}
                />
                <Input
                  label="Last Name"
                  onChange={(e) => {
                    setUpdateLastName(e.target.value);
                  }}
                  type="text"
                  placeholder={lastName}
                  value={updateLastName}
                  isRequired={false}
                />
                <Input
                  label="Phone Number"
                  onChange={(e) => {
                    setUpdatePhone(e.target.value);
                  }}
                  type="number"
                  placeholder={String(phone)}
                  value={updatePhone}
                  isRequired={false}
                />
                <Input
                  label="Email"
                  onChange={(e) => {
                    setUpdateEmail(e.target.value);
                  }}
                  type="email"
                  placeholder={email}
                  value={updateEmail}
                  isRequired={false}
                />
                <div className="md:mt-10 mt-5">
                  <PrimaryButton text="Save" />
                </div>
              </form>
              <button
                onClick={logoutHandler}
                className="w-full sm:p-2 p-1 mt-2 border-[2px] rounded-md sm:text-sm text-[12px] main-heading-font border-orange-500 hover:text-white hover:bg-[#f48617] duration-200 ease-in-out">
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
