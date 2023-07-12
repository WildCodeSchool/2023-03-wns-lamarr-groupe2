import React from "react";
import FriendsLeaderboard from "./leaderboard/FriendsLeaderboard";
import MyChallenges from "./challenge/MyChallenges";
import MyTeams from "./teams/MyTeams";

export default function DashboardPage() {
  const width = window.innerWidth

  return <section className="flex gap-10 w-full">
    <div className="border-2 border-primary-danger hidden w-3/12   lg:flex"><FriendsLeaderboard />{width}</div>
    <div className="flex justify-center w-full lg:block lg:w-5/12 "><MyChallenges /></div>
    <div className="border-2 border-primary-attention hidden w-4/12 lg:flex"><MyTeams /></div>
  </section>;
}
