export const fetchComment = commentId => (
    $.ajax({
        url: `api/comments/${commentId}`
    })
);