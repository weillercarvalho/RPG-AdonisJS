import User from 'App/Models/User'

export async function CleanDb() {
  const users = await User.all()

  for (const user of users) {
    await user.delete()
  }
}
