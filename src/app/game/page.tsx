"use client";
import { useForm } from "react-hook-form";
import Interests from "@/interests";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATEVALENTINEPROFILE, MYVALENTINEPROFILEQUERY } from "@/gql/gql";
import { UserButton } from "@clerk/nextjs";

type ProfileType = {
  name: string;
  gender: "M" | "F";
  wants: "M" | "F";
  interests: { name: string; score: number }[];
  instagram: string;
  discord?: string;
  email: string;
};

const CreateProfileForm = () => {
  const numbers = [0, 1, 2, 3, 4, 5];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfileType>({
    defaultValues: {
      gender: "M",
      wants: "F",
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
  let total = 0;

  ints.forEach((data) => {
    const num: string = data.score.toString();
    total += parseInt(num);
  });
  const max = ints.length * 1.5;
  const remainder = max - total;

  const [valentineMutation] = useMutation(CREATEVALENTINEPROFILE, {
    refetchQueries: [MYVALENTINEPROFILEQUERY],
  });

  async function onSubmitButton(data: ProfileType) {
    data.interests = data.interests.map((interest) => {
      const score: string = interest.score.toString();
      return { name: interest.name, score: parseInt(score) };
    });
    const val = await valentineMutation({
      variables: {
        Name: data.name,
        Gender: data.gender,
        Wants: data.wants,
        Email: data.name,
        Interests: data.interests,
        Discord: data.discord,
        Instagram: data.instagram,
      },
    });
    console.log(val.data);
    
  }

  return (
    <div className="w-full h-full">
      <h1>Profile creator</h1>
      <UserButton/>
      <form onSubmit={handleSubmit(onSubmitButton)} className="flex flex-col">
        <div>
          <div>First Name</div>
          <input
            {...register("name", { required: true, maxLength: 20 })}
            type="text"
            placeholder="Michael"
            id="name"
          />
          {errors.name?.type == "required" && <div>A username is required</div>}
          {errors.name?.type == "maxLength" && (
            <div>You have exceeded the max length</div>
          )}
        </div>
        <div>
          <div>Gender</div>
          <div>
            Male
            <input
              {...register("gender")}
              type="radio"
              value="M"
              checked={gender == "M"}
            />
          </div>
          <div>
            Female
            <input {...register("gender")} type="radio" value="F" />
          </div>
        </div>
        <p>Who are you looking for</p>
        <label>
          <input {...register("wants")} type="radio" value="M" />
          Male
        </label>
        <label>
          <input
            {...register("wants")}
            type="radio"
            value="F"
            checked={wants == "F"}
          />
          Female
        </label>
        <label>Instagram username</label>
        <input
          {...register("instagram")}
          type="text"
          placeholder="Instagram Link"
        />
        <label>Discord username</label>
        <input
          {...register("discord")}
          type="text"
          placeholder="Discord Link"
        />
        <label>Email</label>
        <input
          {...register("email")}
          type="text"
          placeholder="Eminem@AOL.com"
        />
        <div>What are your interests</div>
        {Interests.map((val, index) => {
          const score = ints[index].score.toString()
          const scoreNum = parseInt(score)
          return (
            <label key={index}>
              {val}
              {numbers.map((number, idx) => {
                return (
                  <input
                    key={idx}
                    {...register(`interests.${index}.score`)}
                    type="radio"
                    value={number}
                    checked={scoreNum == number}
                    disabled={number > scoreNum + remainder}
                  />
                );
              })}
            </label>
          );
        })}
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
const Matches = () => {
  return (
    <div>
      <div>Hello</div>
      <div>You have no matches yet</div>
    </div>
  );
};
const Game = () => {
  const { data, loading } = useQuery(MYVALENTINEPROFILEQUERY);

  return (
    <div className="flex min-h-screen flex-col items-center font-mono p-24">
      {(!loading && data) ? <Matches /> : <CreateProfileForm />}
    </div>
  );
};

export default Game;
