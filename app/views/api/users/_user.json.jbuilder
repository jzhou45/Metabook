json.extract! user, :id, :email, :first_name, :last_name, :about_me
json.profilePhoto url_for(user.profile_photo)
json.coverPhoto url_for(user.cover_photo)