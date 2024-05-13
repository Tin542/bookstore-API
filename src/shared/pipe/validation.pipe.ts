import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        console.log("transform", value, metatype);
        if(!metatype || !this.toValidate(metatype)){
            return value;
        }

        const object = plainToInstance(metatype, value);
        const errors = await Validate(object);
        console.log("errors", errors)
        if(errors.length > 0){
            throw new BadRequestException('Validation failed');
        }
        return value;
    }

    private toValidate(metadata: Function): boolean {
        const type: Function[] = [String, Boolean, Number, Array, Object];
        return !type.includes(metadata);
    }
}