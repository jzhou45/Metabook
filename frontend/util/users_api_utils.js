export const getUser = userId => (
    $.ajax({
        url: `/api/users/${userId}`
    })
)