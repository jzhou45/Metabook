export const getUser = user => (
    $.ajax({
        url: `/api/users/${user.id}`
    })
)