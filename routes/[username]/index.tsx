/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";
import { PageProps, Handlers } from "$fresh/server.ts";
import { fetchUserInfo } from "../../services/github.ts";
import Layout from "../../components/Layout.tsx";
import InfoItem from "../../components/InfoItem.tsx";
import LinkButton from "../../components/LinkButton.tsx";
import Location from "../../icons/Location.tsx";
import Company from "../../icons/Company.tsx";
import Link from "../../icons/Link.tsx";
import Twitter from "../../icons/Twitter.tsx";
import Users from "../../icons/Users.tsx";
import { Status } from "https://deno.land/std@0.146.0/http/http_status.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    try {
      const username = ctx.params.username;
      if (!username) {
        return new Response(undefined, {
          status: Status.Found,
          headers: {
            location: "/",
          },
        });
      }
      const [status, user] = await fetchUserInfo(username);

      if (status !== Status.OK) {
        return new Response(undefined, {
          status: Status.Found,
          headers: {
            location: "/",
          },
        });
      }
      return ctx.render({ user });
    } catch (error) {
      console.log(error);
      return new Response(undefined, {
        status: Status.Found,
        headers: {
          location: "/",
        },
      });
    }
  },
};
export default function Greet({ data, params }: PageProps) {
  const user = data?.user;
  const error = data?.error;
  const username = params.username;
  return (
    <Layout title={error ? "Error" : username}>
      <div className={tw`max-w-3xl mx-auto`}>
        <div className={tw``}>
          <img
            src={user.avatar_url}
            alt={user.name}
            className={tw`w-64 h-64 aspect-square rounded-full`}
          />

          <div className={tw`mt-4`}>
            <h2 className={tw`text-2xl font-bold`}>{user.name}</h2>
            <h2 className={tw`text-xl text-gray-400`}>{user.login}</h2>
          </div>
          <p className={tw`mt-4 text-gray-300 max-w-md`}>{user.bio}</p>

          <div className={tw`mt-4 flex items-center space-x-2`}>
            <a
              href={`/${username}/followers`}
              className={tw`flex items-center space-x-1 hover:underline`}
            >
              <Users />
              <p className={tw`font-bold`}>{user.followers}</p>
              <p className={tw`text-gray-300 text-sm`}>
                {user.followers > 1 ? "followers" : "follower"}
              </p>
            </a>
            <span>&bull;</span>
            <a
              href={`/${username}/following`}
              className={tw`flex items-center space-x-1 hover:underline`}
            >
              <p className={tw`font-bold`}>{user.following}</p>
              <p className={tw`text-gray-300 text-sm`}>
                {user.following > 1 ? "followings" : "following"}
              </p>
            </a>
          </div>

          <div className={tw`mt-4 flex flex-col space-y-2`}>
            {user.company && (
              <InfoItem text={user.company} icon={<Company />} />
            )}
            {user.location && (
              <InfoItem text={user.location} icon={<Location />} />
            )}
            {user.blog && <InfoItem text={user.blog} icon={<Link />} />}
            {user.twitter_username && (
              <InfoItem text={`@${user.twitter_username}`} icon={<Twitter />} />
            )}
          </div>
        </div>

        <div className={tw`mt-8`}>
          <div className={tw`flex items-center gap-4 flex-wrap`}>
            {links.map((link) => (
              <LinkButton
                key={link.name}
                href={`/${username}/${link.href}`}
                name={link.name}
                hidden={link.href == "members" && user.type.toLowerCase() == "user" ? true : false}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

const links = [
  {
    name: "Repositories",
    href: "repositories",
  },
  {
    name: "Subscriptions",
    href: "subscriptions",
  },
  {
    name: "Organizations",
    href: "organizations",
  },
  {
    name: "Members",
    href: "members",
  },
  {
    name: "Events",
    href: "events",
  },
  {
    name: "Received Events",
    href: "received_events",
  },
];
