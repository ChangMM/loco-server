import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { getRepository } from 'typeorm'
import { User } from '@module/user/user.entity'

export function CheckUserExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'CheckUserExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(_: any, args: ValidationArguments) {
          const { login, email }: any = args.object
          const userRepo = getRepository(User)
          const api = await userRepo.findOne({
            where: [{ login }, { email }, { login, email }],
          })
          return !api
        },
      },
    })
  }
}
