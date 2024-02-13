"use client";
import { useForm } from "react-hook-form";
import Interests from "@/interests";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATEVALENTINEPROFILE,
  MYMATCHESQUERY,
  MYVALENTINEPROFILEQUERY,
} from "@/gql/gql";
import { UserButton } from "@clerk/nextjs";
import { PacmanLoader } from "react-spinners";
import { ReactNode, useState } from "react";
import { Lobster, Varela_Round } from "next/font/google";

const headingFamily = Lobster({ subsets: ["latin"], weight: ["400"] });
const mainFamily = Varela_Round({ subsets: ["latin"], weight: ["400"] });

type ProfileType = {
  name: string;
  gender: "M" | "F";
  wants: "M" | "F";
  interests: { name: string; score: number }[];
  instagram: string;
  discord?: string;
  email?: string;
  _id: string | undefined;
  friend_only: "true" | "false" | boolean;
};

const notEnoughPoints = () => {
  alert("Not enough points");
};

const RadioSelect = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const CreateProfileForm = ({
  data,
  submitCallback,
}: {
  data?: ProfileType;
  submitCallback: () => void;
}) => {
  const numbers = [0, 1, 2, 3, 4, 5];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileType>({
    defaultValues: {
      gender: data?.gender ?? "F",
      name: data?.name,
      wants: data?.wants ?? "M",
      friend_only:
        data?.friend_only == undefined
          ? "false"
          : data?.friend_only == true
          ? "true"
          : "false",
      discord: data?.discord,
      instagram: data?.instagram,
      email: data?.email,
      interests: Interests.map((val) => {
        return {
          name: val,
          score: 0,
        };
      }),
    },
  });
  const ints = watch("interests");
  const gender = watch("gender");
  const wants = watch("wants");
  const friend_only = watch("friend_only");
  data && console.log(data);

  let total = 0;

  ints.forEach((data) => {
    const num: string = data.score.toString();
    total += parseInt(num);
  });
  const max = ints.length * 2;
  const remainder = max - total;

  const [valentineMutation] = useMutation(CREATEVALENTINEPROFILE, {
    refetchQueries: [MYVALENTINEPROFILEQUERY],
  });

  async function onSubmitButton(data: ProfileType) {
    data.interests = data.interests.map((interest) => {
      const score: string = interest.score.toString();
      return { name: interest.name, score: parseInt(score) };
    });
    console.log("data is ");

    console.log(data);

    const val = await valentineMutation({
      variables: {
        Name: data.name,
        Gender: data.gender,
        Wants: data.wants,
        Email: data.email,
        Interests: data.interests,
        Discord: data.discord,
        Instagram: data.instagram,
        FriendOnly: data.friend_only === "true" ? true : false,
      },
    });
    submitCallback();
  }
  const interestToString = (num: number) => {
    switch (num) {
      case 0:
        return "Uninterested";
      case 1:
        return "Somewhat Like";
      case 2:
        return "Like";
      case 3:
        return "Like +";
      case 4:
        return "Like ++";
      case 5:
        return "Like a lot";
      default:
        return "Like a lot";
    }
  };
  return (
    <div
      className={`w-full h-full flex items-center flex-col px-4 ${mainFamily.className}`}
    >
      <div className="pb-8 text-3xl">Profile creator</div>
      <div className="w-full flex-col items-start ">
        <form
          onSubmit={handleSubmit(onSubmitButton)}
          className="flex flex-col lg:px-16"
        >
          <div className="py-4">
            <div className="flex text-lg py-2">First Name</div>
            <input
              {...register("name", { required: true, maxLength: 20 })}
              type="text"
              placeholder="My name"
              id="name"
              className="text-lg w-full border-1 border px-8 py-2 rounded-lg"
            />
            {errors.name?.type == "required" && <div>A name is required</div>}
            {errors.name?.type == "maxLength" && (
              <div>You have exceeded the max length</div>
            )}
          </div>
          <div className="pb-4">
            <div className="py-2">Gender</div>
            <div className="flex">
              <input
                {...register("gender")}
                type="radio"
                value="M"
                checked={gender == "M"}
              />
              <div className="px-4">M</div>
              <input {...register("gender")} type="radio" value="F" />
              <div className="px-4">F</div>
            </div>
          </div>

          <div className="pb-4">
            <p>Who are you looking for</p>

            <div className="flex">
              <input
                {...register("wants")}
                type="radio"
                value="M"
                className="px-4"
              />
              <div className="px-4">M</div>
              <input
                {...register("wants")}
                type="radio"
                value="F"
                checked={wants == "F"}
              />
              <div className="px-4">F</div>
            </div>
          </div>
          <div className="pb-4">
            <p>
              Are you just looking for new friends? Like, no romantic matching?
            </p>

            <div className="flex">
              <input
                {...register("friend_only")}
                type="radio"
                value={"true"}
                className="px-4"
                checked={friend_only == "true"}
                id="friend_yes"
              />
              <label htmlFor="friend_yes" className="px-4">
                Yes
              </label>
              <input
                {...register("friend_only")}
                type="radio"
                value={"false"}
                checked={friend_only == "false"}
                id="friend_no"
              />
              <label className="px-4" htmlFor="friend_no">
                No
              </label>
            </div>
          </div>
          <div className="pb-4">
            <label className="flex text-lg py-2">Instagram username</label>
            <input
              {...register("instagram", { required: true })}
              type="text"
              placeholder="Instagram Username"
              className="text-lg w-full border-1 border px-8 py-2 rounded-lg"
            />
            {errors.instagram?.type == "required" && (
              <div>Instagram is required</div>
            )}
          </div>
          <div className="pb-4">
            <label className="flex text-lg py-2">Discord username</label>
            <input
              {...register("discord")}
              type="text"
              placeholder="Discord Username"
              className="text-lg w-full border-1 border px-8 py-2 rounded-lg"
            />
          </div>
          <div className="pb-4">
            <label className="flex text-lg py-2">Email</label>
            <input
              {...register("email")}
              type="text"
              placeholder="bee@gmail.com"
              className="text-lg w-full border-1 border px-8 py-2 rounded-lg"
            />
            {errors.email?.type == "required" && <div>Email is required</div>}
          </div>
          <div className="space-y-4">
            <div className="py-4">What are your interests?</div>
            <span className="border-1 border px-8 py-2 rounded-lg w-fit border-[#d90429] flex flex-row items-center justify-center sticky top-10 bg-white ">
              Points left = <span className="text-3xl ml-2">{remainder}</span>
            </span>
            <div className="space-y-4">
              {Interests.map((val, index) => {
                const score = ints[index].score.toString();
                const scoreNum = parseInt(score);
                return (
                  <div key={index}>
                    <div className="mb-4">{val}</div>
                    <div className="flex flex-col md:flex-row border-1 border px-8 py-2 rounded-lg">
                      {numbers.map((number, idx) => {
                        return (
                          <div
                            key={idx}
                            className={`flex flex-row px-4 items-center border border-1 md:border-0 my-1 ${
                              scoreNum == number ? "py-2" : ""
                            } md:py-0 rounded-lg`}
                          >
                            <input
                              id={`${val}.${index}.${idx}`}
                              {...register(`interests.${index}.score`)}
                              type="radio"
                              value={number}
                              checked={scoreNum == number}
                              disabled={number > scoreNum + remainder}
                            />

                            <label
                              htmlFor={`${val}.${index}.${idx}`}
                              className="px-2"
                            >
                              {interestToString(idx)}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="py-8 px-4 flex flex-row md:justify-center justify-end">
            <button
              type="submit"
              className="border-2 p-4 rounded-lg  border-[#d90429] hover:cursor-pointer hover:scale-[1.2] hover:transform hover:ease-in-out duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

type Matching = {
  score: number;
  round: number;
  matchType: string;
  valentines: ProfileType[];
};

const Matches = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(MYMATCHESQUERY);
  const matches: Matching[] | undefined = data?.valentineMatches;
  const extractMatch = (match: Matching) => {
    const other = match.valentines.filter((val) => val._id !== id);
    return other[0];
  };
  const extractMe = (match: Matching) => {
    const other = match.valentines.filter((val) => val._id === id);
    return other[0];
  };

  const matchingInterests = (match: Matching) => {
    const them = extractMatch(match);
    const me = extractMe(match);

    const theirs2 = them.interests
      .filter((interest) => interest.score > 0)
      .map((interest) => interest);
    const theirs3: any = {};
    for (const key of theirs2) {
      theirs3[key.name] = key.score;
    }

    const mine2 = me.interests
      .filter((interest) => interest.score > 0)
      .map((interest) => interest);

    const mine3: any = {};
    for (const key of mine2) {
      mine3[key.name] = key.score;
    }
    const res2 = Array.from(Object.keys(theirs3))
      .filter((val: any) => !!mine3[val])
      .map((val: string) => {
        return { me: mine3[val], them: theirs3[val], interest: val };
      });

    return res2;
  };

  return (
    <div>
      {loading ? (
        <PacmanLoader />
      ) : (
        <div>
          {matches && matches.length > 0 ? (
            <div>
              <div>Hello {extractMe(matches[0]).name},</div>
              Here are your matches...
              {matches.map((val, index) => {
                const match = extractMatch(val);
                return (
                  <div key={index} className="py-2 px-4 my-2 border-2">
                    <div className="py-2 ">
                      <div>You Matched With:</div>
                      <div>
                        {match.name} in the {val.round} round of Matching
                      </div>
                      <div>Their gender: {match.gender} </div>
                    </div>

                    <div className="py-2">This is a {val.matchType}</div>
                    <div className="py-2">
                      <div>You both share these matching interests</div>
                      <div className="py-4">
                        {matchingInterests(val).map((interest, idx) => (
                          <div key={idx} className="py-1">
                            Interest : {interest.interest}, My Score :
                            {interest.me}, Their Score : {interest.them}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pb-2 ">
                      We determined that your compatability score is {val.score}
                    </div>
                    <div className="py-2">
                      <div>Socials:</div>
                      <div className="py-2">
                        {match.discord && <div>Discord: {match.discord}</div>}
                        <div>Instagram : {match.instagram}</div>
                      </div>
                      <div className="py-2">
                        <div>
                          Remember, stay safe and it&apos; up to you to decide
                          if you want to reach out.
                        </div>
                        <div>If they reach out, please be friendly.</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>You have no matches yet</div>
          )}
        </div>
      )}
    </div>
  );
};

const Game = () => {
  const { data, loading } = useQuery(MYVALENTINEPROFILEQUERY);
  const id = data?.myValentineProfile?._id;
  const [editMode, setEditMode] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  return (
    <div className="flex min-h-screen flex-col items-center font-mono px-4 py-24 lg:p-24">
      <div className="flex justify-end w-full items-center">
        {!loading && !editMode && (
          <button
            className="px-4 mx-4 py-2 border border-2 rounded-md	"
            onClick={() => {
              setEditMode(!editMode);
            }}
          >
            Edit
          </button>
        )}
        {!loading && (
          <button
            className="px-4 mx-4 mr-8 py-2 border border-2 rounded-md	"
            onClick={() => {
              navigator.clipboard.writeText(location.origin);
              setShowCopied(true);
              setTimeout(() => {
                setShowCopied(false);
              }, 2000);
            }}
          >
            {showCopied ? "Copied" : "Share"}
          </button>
        )}
        <UserButton />
      </div>
      {loading ? (
        <PacmanLoader />
      ) : data && !editMode ? (
        <Matches id={id} />
      ) : (
        <CreateProfileForm
          data={data?.myValentineProfile}
          submitCallback={() => {
            setEditMode(false);
          }}
        />
      )}
    </div>
  );
};

export default Game;
