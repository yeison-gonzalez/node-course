import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto, UserEntity } from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(
    private readonly emailService: EmailService,
  ) { }
  
  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel(registerUserDto);
      user.password = bcryptAdapter.hash(registerUserDto.password);
      await user.save();
      const { password, ...userEntity } = UserEntity.fromObject(user);

      await this.sendEmailValidationLink(user.email)

      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');
      return {
        user: userEntity,
        token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest('Email not exist');

    try {
      const hasMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
      if (!hasMatch) throw CustomError.badRequest('Credentials are wrong');
      const { password, ...userEntity } = UserEntity.fromObject(user);
      const token = await JwtAdapter.generateToken({ id: user.id });
      if (!token) throw CustomError.internalServer('Error while creating JWT');
      return {
        user: userEntity,
        token,
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer('Error getting token');

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    };

    const isSend = await this.emailService.sendEmail(options);
    if (!isSend) throw CustomError.internalServer('Error sending email');

    return true;
  }
};
