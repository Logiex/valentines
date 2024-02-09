"use client";
import { useForm } from "react-hook-form";
import Interests from "@/interests";
import { gql, useMutation, useQuery } from "@apollo/client";

type ProfileType = {
  name: string;
  gender: "M" | "F";
  wants: "M" | "F";
  interests: { name: string; value: number }[];
  instagram: string;
  discord?: string;
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
          value: 0,
        };
      }),
    },
  });
  const ints = watch("interests");
  const gender = watch("gender");
  const wants = watch("wants");
  let total = 0;

  ints.forEach((data) => {
    const num: string = data.value.toString();
    total += parseInt(num);
  });
  const max = ints.length * 1.5;
  const remainder = max - total;

  const {data} = useQuery(gql`
    query MyQuery {
      testQuery
    }
  `);
  

  function onSubmitButton(data: ProfileType) {
    console.log(data);
  }

  return (
    <div className="w-full h-full">
      <h1>Profile creator</h1>
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
        <label>
          Instagram Link
          <input {...register("instagram")} type="text" />
        </label>
        <label>
          Discord Link
          <input {...register("discord")} type="text" />
        </label>
        <div>What are your interests</div>
        {Interests.map((val, index) => {
          return (
            <label key={index}>
              {val}
              {numbers.map((number, idx) => {
                return (
                  <input
                    key={idx}
                    {...register(`interests.${index}.value`)}
                    type="radio"
                    value={number}
                    checked={ints[index].value == number}
                    disabled={remainder < number}
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
  return <></>;
};
const Game = () => {
  const getProfile = (val: boolean) => {
    return undefined;
  };
  return (
    <div className="flex min-h-screen flex-col items-center font-mono p-24">
      {getProfile(false) ? <Matches /> : <CreateProfileForm />}
      Hello
    </div>
  );
};

export default Game;
