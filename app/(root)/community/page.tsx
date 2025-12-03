import UserCard from "@/components/cards/UserCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import ROUTES from "@/constants/routes";
import { EMPTY_USERS } from "@/constants/states";
import { getUsers } from "@/lib/actions/user.action";
import { RouteParams } from "@/types/global";
import React from "react";

const Community = async ({ searchParams }: RouteParams) => {
  const { page, pageSize, query, filter } = await searchParams;
  const { success, data, error } = await getUsers({
    page: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
    query: query ? String(query) : "",
    filter: filter ? String(filter) : "newest",
  });

  const { users, isNext } = data || {};

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mt-11 gap-5 flex max-sm:flex-col">
        <LocalSearch
          route={ROUTES.COMMUNITY}
          iconPosition="left"
          imgSrc="/icons/search.svg"
          placeholder="Search some greate devs..."
          otherClasses="flex-1"
        />
        <CommonFilter
          filters={UserFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <DataRenderer
        empty={EMPTY_USERS}
        data={users}
        success={success}
        error={error}
        render={(users) => (
          <div className="mt-12 flex flex-wrap gap-5">
            {users.map((user) => (
              <UserCard key={user.name} {...user} />
            ))}
          </div>
        )}
      />
      <Pagination page={page} isNext={isNext || false} />
    </div>
  );
};

export default Community;
