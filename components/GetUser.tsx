"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const GetUser = () => {
    const { user, getUser } = useKindeBrowserClient();
    const alsoUser = getUser();

    console.log(user);

    return (
        <div>
            <h1>User</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            {/* <pre>{JSON.stringify(alsoUser, null, 2)}</pre> */}
        </div>
    );
};

export default GetUser;