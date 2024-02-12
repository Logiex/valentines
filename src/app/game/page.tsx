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
type ProfileType = {
  name: string;
  gender: "M" | "F";
  wants: "M" | "F";
  interests: { name: string; score: number }[];
  instagram: string;
  discord?: string;
  email: string;
  _id: string | undefined;
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
      <UserButton />
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
          {...register("instagram", { required: true })}
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
          {...(register("email"), { required: true })}
          type="text"
          placeholder="Eminem@AOL.com"
        />
        <div>What are your interests</div>
        {Interests.map((val, index) => {
          const score = ints[index].score.toString();
          const scoreNum = parseInt(score);
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

type Matching = {
  score: number;
  round: number;
  matchType: string;
  valentines: ProfileType[];
};

const Matches = ({ id }: { id: string }) => {
  const { data, loading, error } = useQuery(MYMATCHESQUERY);
  const matches: Matching[] | undefined = data?.valentineMatches;
  data?.valentineMatches && console.log(matches);
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

    const theirs = new Set(
      them.interests
        .filter((interest) => interest.score > 0)
        .map((interest) => interest.name)
    );

    const mine = new Set(
      me.interests
        .filter((interest) => interest.score > 0)
        .map((interest) => interest.name)
    );

    const res = Array.from(theirs).filter((val) => mine.has(val));
    return res;
  };

  return (
    <div>
      {loading ? (
        <PacmanLoader />
      ) : (
        <div>
          <div>Hello</div>
          {matches ? (
            <div>
              Here are your matches...
              {matches.map((val, index) => {
                console.log(`with ${val}`);

                const match = extractMatch(val);
                return (
                  <div key={index} className="py-2 px-4 my-2 border border-2">
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
                      <div>
                        {matchingInterests(val).map((interest, idx) => (
                          <div key={idx}>{interest}</div>
                        ))}
                      </div>
                    </div>
                    <div className="py-2">
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
  return (
    <div className="flex min-h-screen flex-col items-center font-mono p-24">
      <div className="flex justify-end w-full">
        <UserButton />
      </div>
      {loading ? (
        <PacmanLoader />
      ) : data ? (
        <Matches id={id} />
      ) : (
        <CreateProfileForm />
      )}
    </div>
  );
};

export default Game;
