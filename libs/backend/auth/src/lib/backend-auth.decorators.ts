import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from './backend-auth.constants';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export function IsEqualTo<T>(
  property: keyof T,
  validationOptions?: ValidationOptions
) {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      name: 'isEqualTo',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: Record<string, unknown>, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as Record<string, unknown>)[
            relatedPropertyName
          ];
          return value === relatedValue;
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName} exactly`;
        },
      },
    });
  };
}
