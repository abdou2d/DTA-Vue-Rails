# Five seed users always have same email format

users = [
  'firstuser@example.com',
  'seconduser@example.com',
  'thirduser@example.com',
  'fourthuser@example.com',
  'fifthuser@example.com'
]

#################################
# Create Users                  #
#################################
users.each do |user|

  # Create each user in the user array
  User.create(
    email: user,
    # keep sign-in count > 0 for possible future functionality
    sign_in_count: 5,
    # CHANGE username limits to reflect your site policies
    user_name: Faker::Internet.user_name(5..12),
    password: 'password',
    password_confirmation: 'password'
  )
end

#################################
# Create Notes                  #
#################################
users.each_with_index do |user, index|
  5.times do
    Note.create(
    note: Faker::ChuckNorris.fact,
    user_id: (index + 1)
    )
  end
end
