export const fetchUser = userId => (
    $.ajax({
        url: `/api/users/${userId}`
    })
);

export const fetchUsers = () => (
    $.ajax({
        url: "/api/users"
    })
);