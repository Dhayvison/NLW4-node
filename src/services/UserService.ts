import { User } from '../models/User';

class UserService {
  static async create(name: string, email: string) {
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      return { error: 'User already exists' };
    }

    const newUser = new User(name, email);
    const created = await newUser.save();
    return { error: '', created };
  }

  static async read(id: string) {
    try {
      const user = await User.findOneOrFail({ id });
      return { error: '', user };
    } catch (error) {
      return { error: 'User not found' };
    }
  }

  static async readAll() {
    const users = await User.find();
    return { error: '', users };
  }

  static async update(
    id: string,
    { name, email }: { name: string; email: string },
  ) {
    const result = await this.read(id);
    if (result.error) {
      return {
        error: result.error,
      };
    } else if (name && email) {
      const { user } = result;
      user.name = name;
      user.email = email;
      const updated = await user.save();
      return { error: '', updated };
    } else {
      return { error: 'Empty name or email' };
    }
  }

  static async delete(id: string) {
    const result = await this.read(id);
    if (result.error) {
      return {
        error: result.error,
      };
    } else {
      const { user } = result;
      const deleted = await user.remove();
      return { error: '', deleted };
    }
  }
}

export { UserService };
